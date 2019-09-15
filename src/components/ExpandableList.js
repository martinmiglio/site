import React, { Component } from "react";
import { TransitionGroup } from "react-transition-group";
import "./ExpandableList.css";
import ExpandableBox from "./ExpandableBox";

export default class ExpandableList extends Component {
  render() {
    const uuidv1 = require("uuid/v4");
    const contentList = this.props.contentList;
    return (
      <div className="wrapper">
        <TransitionGroup className="wrapper-transition">
          {contentList.map(item => (
            <ExpandableBox
              key={uuidv1()}
              headerText={item.headerText}
              content={item.content}
            />
          ))}
        </TransitionGroup>
      </div>
    );
  }
}
