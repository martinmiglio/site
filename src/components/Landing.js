import React, { Component } from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import styles from "../styles/Landing.module.css";

export default class Landing extends Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <header className={styles.header}>
          {this.props.logo ? (
            <Image src={this.props.logo} className={styles.logo} />
          ) : null}
          <h1>{this.props.header}</h1>
          <p className={styles.signature}>{this.props.signature}</p>
        </header>
      </div>
    );
  }
}
Landing.propTypes = {
  header: PropTypes.string.isRequired,
  signature: PropTypes.string.isRequired,
};
