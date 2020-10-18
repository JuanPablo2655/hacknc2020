import React, { useState, useEffect } from "react";
import { upload_document, create_fact } from "./utils";
import "./App.css";
import DirectFactCreationModal from "./components/DirectFactCreationModal";

function App() {
  const login_token = {
    token: "6670f3bf-c188-47bb-8019-a774fd2db0e0",
    good_until: "2020-10-19T12:45:15.503529406Z",
  };
  return (
    <div className="App">
      <DirectFactCreationModal
        on_submit={(statement, file, page_number) => {
          (async () => {
            let document_id = await upload_document(login_token, file);
            let fact_id = await create_fact(login_token, {
              statement,
              document_id,
              page_number,
            });
            console.log(`created fact ${fact_id} with document ${document_id}`);
          })()
            .then(console.log)
            .catch(console.error);
        }}
      />
    </div>
  );
}

export default App;
