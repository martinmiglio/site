import React, { Component } from "react";
import ReactGA from "react-ga";

import "./../../../stylesheets/SourceLink.css";

function onLinkClick() {
  ReactGA.event({ category: "User", action: "Clicked source link" });
}
export default class SourceLink extends Component {
  render() {
    return (
      <div className="sourcelink-wrapper">
        <a
          className="sourcelink"
          href="https://github.com/marmig0404/portfolio/"
          id="bottom"
          onClick={() => onLinkClick()}
        >
          {"View Source Code"}
        </a>
      </div>
    );
  }
}
