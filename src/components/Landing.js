import React, { Component } from "react";
import logo from "./logo.svg";

export default class Landing extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Welcome to my page</h1>
          <p className="Signiature">-Martin</p>
        </header>
      </div>
    );
  }
}
