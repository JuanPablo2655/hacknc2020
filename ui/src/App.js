import React, { useState, useEffect } from "react";
import { search } from "./utils";
import "./App.css";
import Search from "./components/Search";
import ResultsPage from "./components/ResultsPage";

function App() {
  const login_token = {
    token: "6670f3bf-c188-47bb-8019-a774fd2db0e0",
    good_until: "2020-10-19T12:45:15.503529406Z",
  };
  const [search_query, set_search_query] = useState("");
  const [fact_ids, set_fact_ids] = useState(null);
  return (
    <div className="App">
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