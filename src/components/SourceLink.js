import React, { Component } from "react";
import { sourceLinkEvent } from "../GoogleAnalytics";
import styles from "../styles/SourceLink.module.css";

export default class SourceLink extends Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <a
          className={styles.sourcelink}
          href="https://github.com/marmig0404/portfolio/"
          id="bottom"
          onClick={() => sourceLinkEvent()}
        >
          {"View Source Code"}
        </a>
      </div>
    );
  }
}
