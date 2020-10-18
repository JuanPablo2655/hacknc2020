import React, { useState, useEffect } from "react";
import { search, upload_document, create_fact } from "./utils";
import "./css/App.css";
import Search from "./components/Search";
import ResultsPage from "./components/ResultsPage";
import Header from "./components/Header";

function App() {
  const [search_query, set_search_query] = useState("");
  const [fact_ids, set_fact_ids] = useState(null);
  return (
    <div className="App">
      <Header/>
      <Search
        on_search={(q) => {
          set_search_query(q);
          search(q).then((fact_ids) => set_fact_ids(fact_ids));
        }}
        on_search_update={() => {}}
      />
      {fact_ids != null && (
        <ResultsPage fact_ids={fact_ids} set_selected={console.log} />
      )}
    </div>
  );
}

export default App;