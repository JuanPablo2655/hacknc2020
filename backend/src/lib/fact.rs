#![allow(dead_code)]
use crate::lib::{document::DocumentID, user::UserID, util::DateTime};
use chrono::Utc;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

pub type FactID = Uuid;

#[derive(Debug, Clone, Hash, Serialize, Deserialize)]
pub struct FactMetadata {
    creation_date: DateTime,
    created_by: UserID,
    fact_id: FactID,
}
impl FactMetadata {
    pub fn new(user: UserID) -> Self {
        Self {
            creation_date: Utc::now(),
            created_by: user,
            fact_id: Uuid::new_v4(),
        }
    }
}

#[derive(Debug, Clone, Hash, Serialize, Deserialize)]
pub enum Fact {
    DirectFact {
        metadata: FactMetadata,
        statement: String,
        document_id: DocumentID,
        page_number: u32,
    },
    SuperiorFact {
        metadata: FactMetadata,
        statement: String,
        supporting_facts: Vec<FactID>,
    },
}

impl Fact {
    pub fn new_direct_fact(
        statement: String,
        user: UserID,
        document_id: DocumentID,
        page_number: u32,
    ) -> Self {
        Fact::DirectFact {
            metadata: FactMetadata::new(user),
            statement,
            document_id,
            page_number,
        }
    }

    pub fn new_superior_fact(
        statement: String,
        user: UserID,
        supporting_facts: Vec<FactID>,
    ) -> Self {
        Fact::SuperiorFact {
            statement,
            metadata: FactMetadata::new(user),
            supporting_facts,
        }
    }

    pub fn get_metadata(&self) -> &FactMetadata {
        match self {
            Fact::DirectFact {
                metadata,
                statement: _,
                document_id: _,
                page_number: _,
            } => &metadata,
            Fact::SuperiorFact {
                metadata,
                statement: _,
                supporting_facts: _,
            } => &metadata,
        }
    }

    pub fn get_statement(&self) -> &String {
        match self {
            Fact::DirectFact {
                metadata: _,
                statement,
                document_id: _,
                page_number: _,
            } => &statement,
            Fact::SuperiorFact {
                metadata: _,
                statement,
                supporting_facts: _,
            } => &statement,
        }
    }
}
