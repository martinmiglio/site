import { useState } from "react";
import {
  faGithub,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faCube, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { socialBarEvent } from "../GoogleAnalytics";

const iconMap = {
  twitter: faTwitter,
  linkedin: faLinkedinIn,
  mail: faEnvelope,
  github: faGithub,
  thingiverse: faCube,
};

const iconStyle = {
  color: "slategray",
  padding: "10px",
  width: "4rem",
  height: "4rem",
  textAlign: "center",
  textDecoration: "none",
  position: "relative",
  transition: "all 0.15s ease-in-out",
};

const SocialIcon = ({ contactContent, contactLink }) => {
  const [hover, setHover] = useState(false);
  return (
    <div key={contactContent}>
      <span role="img" aria-labelledby={contactContent}>
        <a
          href={contactLink}
          onClick={() => socialBarEvent(contactContent)}
          onContextMenu={() => socialBarEvent(contactContent)}
        >
          <FontAwesomeIcon
            icon={iconMap[contactContent]}
            style={{
              ...iconStyle,
              top: hover ? "-1rem" : "0",
              opacity: hover ? "0.7" : "1",
            }}
            onMouseEnter={() => {
              setHover(true);
            }}
            onMouseLeave={() => {
              setHover(false);
            }}
          />
        </a>
      </span>
    </div>
  );
};

export default SocialIcon;
