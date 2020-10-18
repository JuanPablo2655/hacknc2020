import React, { useState, useEffect } from "react";
import "./App.css";
import Search from "./components/Search";
import DirectFactComponent from "./components/DirectFactComponent";
import ResultsPage from "./components/ResultsPage";
import SuperiorFactComponent from "./components/SuperiorFactComponent";

function App() {
  const website = "http://localhost:8000";

  const dFact = {
    statement: "Hello World",
    fact_id: 0,
    supporting_documents: ["Test.pdf"],
    created_by: 33213,
  };

  const sFact = {
    statement: "Hello World",
    fact_id: 0,
    created_by: 33213,
  };

  const getUser = () => {
    return "bob";
  };

  const getFact = async (fact_id) => {
      let response = await fetch(`${website}/v1/get_fact/${fact_id}`);
      return response.json();
  };

    const signup = async (username, email, password, signup_token) => {
        let response = await fetch(`${website}/v1/signup`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    username,
                    email,
                    password,
                    token: signup_token,
                }
            )
        });
        return response.json();
    };

  const login = async (email, password) => {
      let response = await fetch(`${website}/v1/login`, {
          method: "POST",
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(
              {
                  email,
                  password,
              }
          )
      });
      return response.json();

  };

    useEffect(() => {
        signup("test_username", "test@email.com", "password", "2cd24046-ea14-4f24-8f8f-847c659ebb22").then(console.log).catch(console.error);
    })

  const [inputText, setInputText] = useState("");
  const [getSelectedFact, setSelectedFact] = useState([]);
  const [getResults, setResults] = useState([]);

  return (
    <div className="App">
      <Search
        setInputText={setInputText}
        setResults={setResults}
        getFact={getFact}
      />
      <DirectFactComponent
        dFact={dFact}
        getUser={getUser}
        setSelectedFact={setSelectedFact}
        getSelectedFact={getSelectedFact}
        getFact={getFact}
      />
      <SuperiorFactComponent
        sFact={sFact}
        dFact={dFact}
        getUser={getUser}
        setSelectedFact={setSelectedFact}
        getSelectedFact={getSelectedFact}
        getFact={getFact}
      />
      <ResultsPage
        sFact={sFact}
        dFact={dFact}
        getUser={getUser}
        setSelectedFact={setSelectedFact}
        getSelectedFact={getSelectedFact}
        getFact={getFact}
        getResults={getResults}
      />
    </div>
  );
}

export default App;
