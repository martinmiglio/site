import {
  faGithub,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faCube, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { socialBarEvent } from "../GoogleAnalytics";
import styles from "../styles/SocialBar.module.css";

function getIcon(contactContent) {
  switch (contactContent) {
    case "twitter":
      return faTwitter;
    case "linkedin":
      return faLinkedinIn;
    case "mail":
      return faEnvelope;
    case "github":
      return faGithub;
    case "thingiverse":
      return faCube;
    default:
      return null;
  }
}

export default class SocialBar extends Component {
  render() {
    const contentList = this.props.contentList;
    return (
      <div className={styles.wrapper}>
        {contentList.map((item, index) => (
          <div className={styles.cell} key={uuidv4()}>
            <span role="img" aria-labelledby={item.contactContent}>
              <a
                className={styles.iconlink}
                href={item.contactLink}
                onClick={() => socialBarEvent(item.contactContent)}
                onContextMenu={() => socialBarEvent(item.contactContent)}
              >
                <FontAwesomeIcon
                  className={"icon fa-bounce"}
                  icon={getIcon(item.contactContent)}
                  style={{
                    color: "slategray",
                    padding: "10px",
                    fontSize: "50px",
                    width: "50px",
                    textAlign: "center",
                    textDecoration: "none",
                    "--fa-animation-iteration-count": 3,
                    "--fa-animation-delay": `${index * 100}ms`,
                    "--fa-bounce-start-scale-x": 1,
                    "--fa-bounce-start-scale-y": 1,
                    "--fa-bounce-jump-scale-x": 1,
                    "--fa-bounce-jump-scale-y": 1,
                    "--fa-bounce-land-scale-x": 1,
                    "--fa-bounce-land-scale-y": 1,
                  }}
                />
                <div />
              </a>
            </span>
          </div>
        ))}
      </div>
    );
  }
}
SocialBar.propTypes = {
  contentList: PropTypes.array.isRequired,
};