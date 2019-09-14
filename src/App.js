import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return React.createElement(
    "div",
    { className: "App" },
    React.createElement("header", { className: "App-header" }, [
      React.createElement("img", {
        src: logo,
        className: "App-logo",
        alt: "logo"
      }),
      React.createElement("h", {}, "Welcome to my page"),
      React.createElement("p", { className: "Signiature" }, "-Martin")
    ])
  );
}

export default App;
