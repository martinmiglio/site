import React, { Component } from "react";
import "./../../../stylesheets/SourceLink.css";

export default class SourceLink extends Component {
  render() {
    return (
      <div className="sourcelink-wraper">
        <a
          className="sourcelink"
          href="https://github.com/marmig0404/portfolio/"
          id="bottom"
        >
          {"View Source Code"}
        </a>
      </div>
    );
  }
}
