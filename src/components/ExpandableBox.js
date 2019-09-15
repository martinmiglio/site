import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";
import "./ExpandableBox.css";

export default class ExpandableBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentVisibility: false
    };
  }

  render() {
    const headerText = this.props.headerText;
    const content = this.props.content;
    console.log(this.state.contentVisibility);
    return (
      <div className="box-wrapper">
        <header
          className="header"
          onClick={() => {
            this.setState({ contentVisibility: !this.state.contentVisibility });
          }}
          onKeyPress={() => {
            this.setState({ contentVisibility: !this.state.contentVisibility });
          }}
          role="button"
          tabIndex={0}
        >
          {headerText}
        </header>
        <CSSTransition
          in={this.state.contentVisibility}
          classNames="content-wrapper"
          mountOnEnter={true}
          unmountOnExit={true}
          timeout={0}
        >
          {content}
        </CSSTransition>
      </div>
    );
  }
}
