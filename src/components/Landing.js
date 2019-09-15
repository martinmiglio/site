import React, { Component } from "react";
import "./Landing.css";
import logo from "./assets/logo.svg";

export default class Landing extends Component {
  render() {
    return (
      <div className="Landing">
        <header className="Landing-header">
          <img src={logo} className="Landing-logo" alt="logo" />
          <h1>Welcome to my page</h1>
          <p className="Landing-Signiature">-Martin</p>
        </header>
      </div>
    );
  }
}
