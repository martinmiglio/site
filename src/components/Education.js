import React, { Component } from "react";
import "./Tab.css";

export default class Education extends Component {
  render() {
    const uuidv4 = require("uuid/v4");
    const contentList = this.props.contentList;
    return (
      <div className="tab-wrapper">
        {contentList.map(item => (
          <div className="tab-education" key={uuidv4()}>
            <img
              className="tab-image"
              src={item.imageSource}
              alt={item.header}
            />
            <div className="tab-body">
              <header className="tab-header">{item.header}</header>
              {item.body}
            </div>
          </div>
        ))}
      </div>
    );
  }
}
