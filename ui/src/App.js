import React, { useState } from 'react';
import './App.css';

import Search from './components/Search'
import Upload from './components/Upload'
import Header from './components/Header'

const App = () => {
  const [inputText, setInputText] = useState("");
  const [file, setFile] = useState("");
  //sign in
  const [inputUsername, setInputUsername] = useState("");
  const [inputEmail, setinputEmail] = useState("");
  const [inputToken, setinputToken] = useState("");
  return (
    <div className="App">
      <Header setInputUsername={setInputUsername} setinputEmail={setinputEmail} setinputToken={setinputToken}/>
      <h1>HackNC {inputText}</h1>
      <Search setInputText={setInputText} />
      <Upload file={file} setFile={setFile}/>
    </div>
  );
}

export default App;
