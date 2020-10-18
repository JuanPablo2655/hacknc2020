use serde::{Deserialize, Serialize};
use std::path::PathBuf;
use url::Url;
use uuid::Uuid;

pub type DocumentID = Uuid;

#[derive(Debug, Clone, Hash, Serialize, Deserialize)]
pub enum DocumentLocation {
    OnDisk { file_path: PathBuf },
    FromRemote { url: Url },
}
