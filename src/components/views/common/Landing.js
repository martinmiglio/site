import React, { Component } from "react";
import "./../../../stylesheets/Landing.css";

export default class Landing extends Component {

  render() {
    return (
      <div className={this.props.className + "-div"}>
        <header className={this.props.className + "-header"}>
          <img src={this.props.logo} className={this.props.className + "-logo"} alt="logo" />
          <h1>{this.props.header}</h1>
          <p className={this.props.className + "-signature"}>
            {this.props.signature}
          </p>
        </header>
      </div>
    );
  }
}
