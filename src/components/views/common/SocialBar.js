import React, { Component } from "react";
import ReactGA from "react-ga";
import { v4 as uuidv4 } from "uuid";

import "./../../../stylesheets/SocialBar.css";

function onLinkClick(contactType) {
  ReactGA.event({ category: "User", action: "Clicked social: " + contactType });
}

export default class SocialBar extends Component {
  render() {
    const contentList = this.props.contentList;
    return (
      <div className="sb-wrapper">
        {contentList.map((item) => (
          <div className="cell" key={uuidv4()}>
            <span role="img" aria-labelledby={item.contactType}>
              <a
                className={"fa fa-" + item.contactType}
                href={item.contactLink}
                onClick={() => onLinkClick(item.contactType)}
              >
                <div />
              </a>
            </span>
          </div>
        ))}
      </div>
    );
  }
}
