import React , { useState } from 'react';
import './App.css';
import Search from './components/Search';
import DirectFactComponent from './components/DirectFactComponent';
import ResultsPage from './components/ResultsPage';
import SuperiorFactComponent from './components/SuperiorFactComponent';

function App() {
  const dFact = {
    statement: "Hello World", 
    fact_id: 0, 
    supporting_documents: ["Test.pdf"],
    created_by: 33213
  }

  const sFact = {
    statement: "Hello World", 
    fact_id: 0, 
    created_by: 33213
  }

  const getUser = () =>  {
    return(
      "bob"
    )
  }

  const getFact = () =>  {
    return(
      dFact
    )
  }

  const [inputText, setInputText] = useState("");
  const [getSelectedFact, setSelectedFact] = useState([]);
  const [getResults, setResults] = useState([]);

  return (
    <div className="App">
      <Search setInputText={setInputText} 
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
