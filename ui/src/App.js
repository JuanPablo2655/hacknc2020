import React, { useState } from 'react';
import './App.css';

import Search from './components/Search'
import Upload from './components/Upload'
import Header from './components/Header'

const App = () => {
  const [inputText, setInputText] = useState("");
  const [file, setFile] = useState("");
  return (
    <div className="App">
      <Header />
      <h1>HackNC {inputText}</h1>
      <Search setInputText={setInputText} />
      <Upload file={file} setFile={setFile}/>
    </div>
  );
}

export default App;
