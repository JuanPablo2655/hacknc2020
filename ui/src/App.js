import React, { useState, useEffect } from "react";
import { search, upload_document, create_fact } from "./utils";
import "./css/App.css";
import Search from "./components/Search";
import ResultsPage from "./components/ResultsPage";
import Header from "./components/Header";
import {Route, Router, Redirect} from "react-router-dom";
import history from "./history";
import Signin from "./components/Signin";
import DirectFactCreationModal from "./components/DirectFactCreationModal";

function App() {
  const [search_query, set_search_query] = useState("");
  const [fact_ids, set_fact_ids] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  return (
    <Router history={history}>
      <div className="App">
        <Route exact path="/">
          <Header/>
          <Search
            on_search={(q) => {
              set_search_query(q);
              search(q).then((fact_ids) => {set_fact_ids(fact_ids); history.push('/results')});
            }}
            on_search_update={() => {}}
          />
          <button onClick={() => setIsOpen(true)}>Upload Fact</button>
          <DirectFactCreationModal isOpen={modalIsOpen} onClose = {() => setIsOpen(false)} />
        </Route>
        <Route path="/results">
          <Header/>
          <Search
            on_search={(q) => {
              set_search_query(q);
              search(q).then((fact_ids) => {set_fact_ids(fact_ids); history.push('/results')});
            }}
            on_search_update={() => {}}
          />
          {fact_ids != null && (
            <ResultsPage fact_ids={fact_ids} set_selected={console.log} />
          )}
        </Route>
      </div>
    </Router>
  );
}

export default App;