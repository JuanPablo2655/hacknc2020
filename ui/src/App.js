import React, { useState, useEffect } from "react";
import {sha256} from "js-sha256";
import "./App.css";
import Search from "./components/Search";
import DirectFactComponent from "./components/DirectFactComponent";
import ResultsPage from "./components/ResultsPage";
import SuperiorFactComponent from "./components/SuperiorFactComponent";
import Signin from "./components/Signin";
import Signup from "./components/Signup";

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
        let hash = sha256.create();
        hash.update(password);
        hash.hex();
        console.log(hash);
        let response = await fetch(`${website}/v1/signup`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    username,
                    email,
                    password: hash.toString(),
                    token: signup_token,
                }
            )
        });
        return response.json();
    };

  const login = async (email, password) => {
      let hash = sha256.create();
      hash.update(password);
      hash.hex();
      let response = await fetch(`${website}/v1/login`, {
          method: "POST",
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(
              {
                  email,
                  password: hash.toString(),
              }
          )
      });
      return response.json();

  };

  const [inputText, setInputText] = useState("");
  const [getSelectedFact, setSelectedFact] = useState([]);
  const [getResults, setResults] = useState([]);

  return (
    <div className="App">
      <Signin login={login}/>
      <Signup signup={signup}/>
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
