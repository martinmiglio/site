import React, { Component } from "react";
import Collapsible from "react-collapsible";
import "./CollapsibleList.css";

export default class SocialBar extends Component {
  render() {
    const uuidv4 = require("uuid/v4");
    const contentList = this.props.contentList;
    return (
      <div className="cl-wrapper">
        {contentList.map(item => (
          <Collapsible trigger={item.trigger} key={uuidv4()}>
            {item.content}
          </Collapsible>
        ))}
      </div>
    );
  }
}
