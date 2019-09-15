import React, { Component } from "react";
import "./ExpandableList.css";
import ExpandableBox from "./ExpandableBox";

export default class ExpandableList extends Component {
  constructor(props) {
    super(props);
    this.state = "";
  }

  render() {
    const contentList = this.props.contentList;
    return (
      <div className="wrapper">
        {contentList.map(item => (
          <ExpandableBox
            key={item.headerText}
            headerText={item.headerText}
            content={item.content}
          />
        ))}
      </div>
    );
  }
}
