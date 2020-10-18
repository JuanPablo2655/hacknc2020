#![allow(dead_code)]
use crate::{
    lib::{
        document::{DocumentID, DocumentLocation},
        fact::{Fact, FactID},
        user::{User, UserID, UserType},
        util::DateTime,
    },
    AppError,
};
use chrono::{Duration, Utc};
use rocket::{
    http::Status,
    outcome::IntoOutcome,
    request::{FromRequest, Outcome, Request},
    Data,
};
use serde::{Deserialize, Serialize};
use std::{collections::HashMap, path::PathBuf};
use uuid::Uuid;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AppDatabase {
    facts: HashMap<FactID, Fact>,
    users: HashMap<UserID, User>,
    documents: HashMap<DocumentID, DocumentLocation>,
    logged_in_users: Vec<(UserID, UserLoginToken)>,
    signup_tokens: Vec<SignupToken>,
}

impl AppDatabase {
    pub fn new_database() -> Self {
        Self {
            facts: HashMap::new(),
            users: HashMap::new(),
            documents: HashMap::new(),
            logged_in_users: Vec::new(),
            signup_tokens: Vec::new(),
        }
    }

    fn add_user(&mut self, mut user: User, user_type: UserType) -> UserID {
        let id = Uuid::new_v4();

        user.set_type(user_type);
        self.users.insert(id, user);

        id
    }

    fn add_fact(&mut self, fact: Fact) -> FactID {
        let id = Uuid::new_v4();

        self.facts.insert(id, fact);
        id
    }

    fn add_document(&mut self, document_location: DocumentLocation, document_id: DocumentID) {
        self.documents.insert(document_id, document_location);
    }
    fn create_login_token(&mut self, user_id: UserID) -> UserLoginToken {
        let token = UserLoginToken::new(Duration::days(1));
        self.logged_in_users.push((user_id, token));
        token
    }

    pub fn create_signup_token(
        &mut self,
        created_by: Option<UserID>,
        type_of_user: UserType,
    ) -> SignupToken {
        let token = SignupToken::new(created_by, type_of_user);
        self.signup_tokens.push(token.clone());
        token
    }

    pub fn redeem_signup_token(&mut self, token: String, user: User) -> Option<UserID> {
        // Get the token or fail
        let matching_tokens = self
            .signup_tokens
            .iter()
            .filter(|t| t.token == token)
            .cloned()
            .collect::<Vec<_>>();
        let token = matching_tokens.into_iter().next()?;

        // Remove the token from the valid tokens
        self.signup_tokens = self
            .signup_tokens
            .iter()
            .filter(|t| **t != token)
            .cloned()
            .collect();
        Some(self.add_user(user, token.type_of))
    }

    pub fn try_login(&mut self, email: &String, password: &String) -> Option<UserLoginToken> {
        let user = self
            .users
            .iter()
            .filter(|(_id, user)| user.test_login(email, password))
            .map(|(id, user)| (id.clone(), user.clone()))
            .collect::<Vec<(UserID, User)>>();
        if let Some((user_id, _user)) = user.first() {
            Some(self.create_login_token(*user_id))
        } else {
            None
        }
    }

    pub fn invalidate_login_token(&mut self, token: &String) {
        self.logged_in_users = self
            .logged_in_users
            .iter()
            .filter(|(_user_id, login_token)| login_token.token.to_string() != *token)
            .cloned()
            .collect();
    }

    pub fn get_login_token(&mut self, token: &String) -> Option<UserLoginToken> {
        let position = self
            .logged_in_users
            .iter()
            .position(|(_user_id, login_token)| login_token.token.to_string() == *token)?;
        let (_user_id, login_token) = self.logged_in_users.get(position)?;

        // Enforce the time expiration
        if let Some(good_until) = &login_token.good_until {
            if Utc::now() >= *good_until {
                // The token has passed its lifetime
                self.logged_in_users.remove(position);
                return None;
            }
        }
        Some(login_token.clone())
    }

    pub fn get_user_id_for_token(&self, token: UserLoginToken) -> Option<UserID> {
        self.logged_in_users
            .iter()
            .filter(|(_user_id, user_token)| *user_token == token)
            .map(|(user_id, _token)| *user_id)
            .collect::<Vec<_>>()
            .get(0)
            .map(|id| *id)
    }

    pub fn get_document(&self, document_id: DocumentID) -> Option<&DocumentLocation> {
        self.documents.get(&document_id)
    }

    pub fn save_document(
        &mut self,
        user_id: UserID,
        root_dir: PathBuf,
        document: Data,
    ) -> Result<DocumentID, AppError> {
        let id = Uuid::new_v4();

        let mut filepath = root_dir.clone();
        filepath.push(format!("{}.pdf", id));

        document
            .stream_to_file(filepath.clone())
            .map(|n| println!("wrote {} bytes", n))
            .map_err(AppError::from)?;

        self.add_document(
            DocumentLocation::OnDisk {
                file_path: filepath,
            },
            id,
        );

        let user = self.users.get_mut(&user_id).unwrap();
        user.add_uploaded_document(id);

        Ok(id)
    }
}

#[derive(Debug, Clone, Hash, PartialEq, Serialize, Deserialize)]
pub struct SignupToken {
    created_by: Option<UserID>,
    token: String,
    type_of: UserType,
}

impl SignupToken {
    pub fn new(created_by: Option<UserID>, type_of: UserType) -> Self {
        Self {
            created_by,
            token: Uuid::new_v4().to_string(),
            type_of,
        }
    }
}

#[derive(Debug, Clone, Copy, Hash, PartialEq, Serialize, Deserialize)]
pub struct UserLoginToken {
    token: Uuid,
    good_until: Option<DateTime>,
}

impl<'a, 'r> FromRequest<'a, 'r> for UserLoginToken {
    type Error = String;
    fn from_request(request: &'a Request<'r>) -> Outcome<Self, Self::Error> {
        use crate::DB;
        use rocket::State;

        let db = request
            .guard::<State<DB>>()
            .map_failure(|_e| (Status::from_code(500).unwrap(), "Server Error".to_string()))?;
        let mut db = db.write().unwrap();
        request
            .headers()
            .get_one("Login-Token")
            .into_outcome((
                Status::from_code(400).unwrap(),
                "Missing login_token header".to_string(),
            ))
            .and_then(|token_str| {
                db.get_login_token(&token_str.to_string()).into_outcome((
                    Status::from_code(401).unwrap(),
                    "Invalid Login Token".to_string(),
                ))
            })
    }
}

impl UserLoginToken {
    pub fn new(duration: Duration) -> Self {
        let now = Utc::now();
        Self {
            token: Uuid::new_v4(),
            good_until: Some(now + duration),
        }
    }

    pub fn from_token(token: &str) -> Self {
        Self {
            token: Uuid::parse_str(token).unwrap(),
            good_until: None,
        }
    }
}
