import React from "react";

import { pageChange, initializeGA } from "../GoogleAnalytics";
import Landing from "../components/Landing";
import SocialBar from "../components/SocialBar";
import SourceLink from "../components/SourceLink";
import Header from "../components/Header";

import styles from "../styles/PortfolioHome.module.css";
import logo from "../assets/PortfolioLogo.svg";

const contactContent = [
  {
    contactContent: "github",
    contactLink: "https://github.com/marmig0404",
  },
  {
    contactContent: "mail",
    contactLink: "mailto:marmig0404@gmail.com",
  },
  {
    contactContent: "linkedin",
    contactLink: "https://www.linkedin.com/in/martinmiglio",
  },
  {
    contactContent: "thingiverse",
    contactLink: "https://www.thingiverse.com/marmig0404/",
  },
];

initializeGA();

export default function PortfolioHome() {
  React.useEffect(() => {
    pageChange(window.location.pathname);
  }, []);
  return (
    <div className={styles.wrapper}>
      <Header
        title="Martin Miglio"
        decsription="My Portfolio"
        keywords="Martin Miglio Portfolio"
        url="https://martinmiglio.dev/"
      />
      <div className={styles.content}>
        <Landing
          logo={logo}
          header="Martin Miglio"
          signature="Check out my links"
        />
        <SocialBar contentList={contactContent} />
      </div>
      <div className={styles.footer}>
        <SourceLink />
      </div>
    </div>
  );
}
