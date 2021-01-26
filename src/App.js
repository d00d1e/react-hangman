import React, { Component } from "react";
import Hangman from "./Hangman";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Hangman />
      </div>
    );
  }
}

export default App;
