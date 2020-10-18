import React, { useState, useEffect } from "react";
import { get_fact } from "./utils";
import "./App.css";
import DirectFactCreationModal from "./components/DirectFactCreationModal";

function App() {
  return (
    <div className="App">
      <DirectFactCreationModal on_submit={console.log} />
    </div>
  );
}

export default App;
