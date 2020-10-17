import React , { useState } from 'react';
import './App.css';
import DirectFactComponent from './components/DirectFactComponent';

function App() {
  const dFact = {
    statement: "Hello World", 
    fact_id: 0, 
    supporting_documents: ["Test.pdf"],
    created_by: 33213
  }

  const get_user = () =>  {
    return(
      "bob"
    )
  }

  const [get_selected_fact, set_selected_fact] = useState([]);

  return (
    <div className="App">
      <DirectFactComponent 
      dFact={dFact} 
      get_user={get_user} 
      set_selected_fact={set_selected_fact} 
      get_selected_fact={get_selected_fact}
      />
    </div>
  );
}

export default App;
