#![feature(proc_macro_hygiene, decl_macro)]

mod lib;
use lib::prelude::*;
use std::sync::RwLock;

use serde::{Deserialize, Serialize};

#[macro_use]
extern crate rocket;
use rocket::{Data, State};
use rocket_contrib::json::Json;

#[get("/")]
fn index() -> &'static str {
    "not a website"
}

type DB = RwLock<AppDatabase>;

#[derive(Debug, Serialize, Deserialize)]
struct LoginAttempt {
    email: String,
    password: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub enum AppError {
    BadUsernameOrPassword,
    InvalidSignupToken,
    IOError,
    OtherError(String),
}

impl From<std::io::Error> for AppError {
    fn from(_error: std::io::Error) -> Self {
        Self::IOError
    }
}

#[post("/v1/login", format = "json", data = "<login>")]
fn login(login: Json<LoginAttempt>, db: State<DB>) -> Result<Json<UserLoginToken>, Json<AppError>> {
    println!("{:?}", login);
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
fn signup(signup: Json<SignupAttempt>, db: State<DB>) -> Result<Json<UserID>, Json<AppError>> {
    let user = User::new(
        signup.username.clone(),
        signup.email.clone(),
        &signup.password,
    );
    db.write()
        .unwrap()
        .redeem_signup_token(signup.token.clone(), user)
        .map(Json)
        .ok_or(Json(AppError::InvalidSignupToken))
}

#[post("/v1/upload_document", format = "plain", data = "<data>")]
fn upload_document(
    user_token: Result<UserLoginToken, String>,
    db: State<DB>,
    data: Data,
) -> Result<Json<DocumentID>, AppError> {
    let mut db = db.write().unwrap();
    let token = user_token.map_err(|s| AppError::OtherError(s))?;

    let user_id = db.get_user_id_for_token(token).unwrap();
    db.save_document(user_id, "/tmp/files".into(), data)
        .map(Json)
}

fn main() {
    let mut db = AppDatabase::new_database();
    let token = db.create_signup_token(None, UserType::AdminUser);
    println!("Signup token {:?}", token);

    rocket::ignite()
        .mount("/", routes![index, login, logout, signup, upload_document])
        .manage(RwLock::new(db))
        .launch();
}
