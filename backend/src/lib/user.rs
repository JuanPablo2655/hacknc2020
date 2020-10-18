#![allow(dead_code)]
use crate::lib::{document::DocumentID, fact::FactID, util::DateTime};
use serde::{Deserialize, Serialize};
use sha2::{digest::Update, Sha256};
use std::io::Write;
use std::net::IpAddr;
use uuid::Uuid;

pub type UserID = Uuid;

#[derive(Debug, Clone, Copy, Hash, PartialEq, Serialize, Deserialize)]
pub enum UserType {
    StandardUser,
    AdminUser,
}

#[derive(Debug, Clone, Hash, Serialize, Deserialize)]
pub struct User {
    display_name: String,
    password_hash: Vec<u8>,
    email_address: String,
    uploaded_facts: Vec<FactID>,
    uploaded_documents: Vec<DocumentID>,
    last_login: Option<(DateTime, IpAddr)>,
    type_of_user: UserType,
}

impl User {
    fn hash_password(password: &String) -> Vec<u8> {
        let mut hasher = Sha256::default();
        hasher.update(password);
        let mut result = Vec::new();
        hasher.write_all(&mut result).unwrap();
        result
    }
    pub fn new(username: String, email_address: String, password: &String) -> Self {
        Self {
            display_name: username,
            password_hash: User::hash_password(password),
            email_address,
            uploaded_facts: vec![],
            uploaded_documents: vec![],
            last_login: None,
            type_of_user: UserType::StandardUser,
        }
    }

    pub fn set_type(&mut self, type_of_user: UserType) {
        self.type_of_user = type_of_user;
    }

    pub fn test_login(&self, email: &String, password: &String) -> bool {
        let result = User::hash_password(password);
        if *email == self.email_address && result == self.password_hash {
            true
        } else {
            false
        }
    }

    pub fn add_uploaded_document(&mut self, id: DocumentID) {
        self.uploaded_documents.push(id);
    }
}
