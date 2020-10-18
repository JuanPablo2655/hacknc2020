#![feature(proc_macro_hygiene, decl_macro)]

mod lib;
use lib::prelude::*;
use std::sync::RwLock;

use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[macro_use]
extern crate rocket;
use rocket::{http::Method, response::NamedFile, Data, State};
use rocket_contrib::json::Json;
use rocket_cors::AllowedOrigins;

#[get("/")]
fn index() -> &'static str {
    "not a website"
}

type DB = RwLock<AppDatabase>;

#[derive(Debug, Serialize, Deserialize)]
pub enum AppError {
    BadUsernameOrPassword,
    InvalidSignupToken,
    NoSuchDocument,
    IOError,
    UuidConvertError,
    FactNotFound,
    CouldNotDetermineFactType,
    OtherError(String),
}

impl From<std::io::Error> for AppError {
    fn from(_error: std::io::Error) -> Self {
        Self::IOError
    }
}

impl From<uuid::Error> for AppError {
    fn from(_error: uuid::Error) -> Self {
        Self::UuidConvertError
    }
}

#[derive(Debug, Serialize, Deserialize)]
struct LoginAttempt {
    email: String,
    password: String,
}

#[post("/v1/login", format = "json", data = "<login>")]
fn login(login: Json<LoginAttempt>, db: State<DB>) -> Result<Json<UserLoginToken>, Json<AppError>> {
    db.write()
        .unwrap()
        .try_login(&login.email, &login.password)
        .ok_or(Json(AppError::BadUsernameOrPassword))
        .map(|token| Json(token))
}

#[post("/v1/logout", format = "json", data = "<logout>")]
fn logout(logout: Json<String>, db: State<DB>) {
    db.write().unwrap().invalidate_login_token(&logout);
}

#[derive(Debug, Serialize, Deserialize)]
struct SignupAttempt {
    username: String,
    email: String,
    password: String,
    token: String,
}

#[post("/v1/signup", format = "json", data = "<signup>")]
fn signup(
    signup: Json<SignupAttempt>,
    db: State<DB>,
    db_filename: State<String>,
) -> Result<Json<UserID>, Json<AppError>> {
    let user = User::new(
        signup.username.clone(),
        signup.email.clone(),
        &signup.password,
    );
    let mut db = db.write().unwrap();
    let result = db
        .redeem_signup_token(signup.token.clone(), user)
        .map(Json)
        .ok_or(Json(AppError::InvalidSignupToken));

    db.save_to_file(&db_filename);
    result
}

#[post("/v1/upload_document", format = "plain", data = "<data>")]
fn upload_document(
    user_token: Result<UserLoginToken, String>,
    db: State<DB>,
    db_filename: State<String>,
    data: Data,
) -> Result<Json<DocumentID>, AppError> {
    let mut db = db.write().unwrap();
    let token = user_token.map_err(|s| AppError::OtherError(s))?;

    let user_id = db.get_user_id_for_token(token).unwrap();
    let result = db
        .save_document(user_id, "/tmp/files".into(), data)
        .map(Json);

    db.save_to_file(&db_filename);
    result
}

#[get("/v1/get_document/<document_id>")]
fn get_document(
    user_token: Result<UserLoginToken, String>,
    document_id: String,
    db: State<DB>,
) -> Result<NamedFile, AppError> {
    let id = Uuid::parse_str(&document_id)?;
    let db = db.read().unwrap();

    // used just to enforce logged in users only
    let _token = user_token.map_err(|s| AppError::OtherError(s))?;
    let document_location = db.get_document(id).ok_or(AppError::NoSuchDocument)?;

    let doc = match document_location {
        DocumentLocation::OnDisk { file_path } => NamedFile::open(file_path)?,
        _ => panic!("document is not on disk"),
    };
    Ok(doc)
}

#[get("/v1/search?<q>")]
fn search(q: String, db: State<DB>) -> Json<Vec<FactID>> {
    let db = db.read().unwrap();
    Json(db.search(q))
}

#[derive(Debug, Serialize, Deserialize)]
struct CreateFactAttempt {
    statement: String,
    document_id: Option<DocumentID>,
    page_number: Option<u32>,
    supporting_facts: Option<Vec<FactID>>,
}

#[post("/v1/create_fact", format = "json", data = "<fact>")]
fn create_fact(
    user_token: Result<UserLoginToken, String>,
    fact: Json<CreateFactAttempt>,
    db: State<DB>,
    db_filename: State<String>,
) -> Result<Json<FactID>, Json<AppError>> {
    let mut db = db.write().unwrap();
    let user_token = user_token.map_err(|s| Json(AppError::OtherError(s)))?;

    let result = if fact.document_id.is_some() && fact.page_number.is_some() {
        let document_id = fact.document_id.unwrap();
        let page_number = fact.page_number.unwrap();
        let user_id = db.get_user_id_for_token(user_token).unwrap();
        let fact = Fact::new_direct_fact(fact.statement.clone(), user_id, document_id, page_number);
        Json(db.insert_fact(user_id, fact))
    } else if fact.supporting_facts.is_some() {
        let supporting_facts = fact.supporting_facts.clone().unwrap();
        let user_id = db.get_user_id_for_token(user_token).unwrap();
        let fact = Fact::new_superior_fact(fact.statement.clone(), user_id, supporting_facts);
        Json(db.insert_fact(user_id, fact))
    } else {
        return Err(Json(AppError::CouldNotDetermineFactType));
    };

    db.save_to_file(&db_filename);
    Ok(result)
}

#[get("/v1/get_fact/<fact_id>")]
fn get_fact(fact_id: String, db: State<DB>) -> Result<Json<Fact>, Json<AppError>> {
    let db = db.read().unwrap();
    let fact_id = Uuid::parse_str(&fact_id).map_err(|e| Json(AppError::from(e)))?;

    let fact = db.get_fact(fact_id).ok_or(Json(AppError::FactNotFound))?;
    Ok(Json(fact.clone()))
}

fn main() {
    let mut db = AppDatabase::load_from_file("app.db").unwrap_or_else(|| {
        println!("failed to load from file app.db, using new database");
        AppDatabase::new_database()
    });
    let token = db.create_signup_token(None, UserType::AdminUser);
    println!("Signup token {:?}", token);

    let allowed_origins = AllowedOrigins::all();

    // You can also deserialize this
    let cors = rocket_cors::CorsOptions {
        allowed_origins,
        allowed_methods: vec![Method::Get, Method::Post]
            .into_iter()
            .map(From::from)
            .collect(),
        allow_credentials: true,
        ..Default::default()
    }
    .to_cors()
    .unwrap();

    rocket::ignite()
        .mount(
            "/",
            routes![
                index,
                login,
                logout,
                signup,
                upload_document,
                get_document,
                create_fact,
                get_fact,
                search
            ],
        )
        .manage(RwLock::new(db))
        .manage("app.db".to_string())
        .attach(cors)
        .launch();
}
