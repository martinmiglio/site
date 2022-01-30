import React, { Component } from "react";
import ReactGA from "react-ga";
import { Helmet } from "react-helmet";

import "./../../../stylesheets/PortfolioHome.css";

import Landing from "../common/Landing";
import SocialBar from "../common/SocialBar";
import SourceLink from "../common/SourceLink";

import logo from "../../assets/PortfolioLogo.svg";

export default class PortfolioHome extends Component {
  render() {
    const contactContent = [
      {
        contactType: "github",
        contactLink: "https://github.com/marmig0404",
      },
      {
        contactType: "envelope",
        contactLink: "mailto:marmig0404@gmail.com",
      },
      {
        contactType: "linkedin",
        contactLink: "https://www.linkedin.com/in/martinmiglio",
      },
      {
        contactType: "cube",
        contactLink: "https://www.thingiverse.com/marmig0404/",
      },
    ];

    return (
      <div className="portfolio-wrapper">
        <Helmet>
          <title>{"Martin Miglio"}</title>
        </Helmet>
        <div className="portfolio-content">
          <Landing
            className="portfolio-landing"
            logo={logo}
            header="Martin Miglio"
            signature="Check out my links"
          />
          <SocialBar contentList={contactContent} className="social" />
        </div>
        <div className="portfolio-footer">
          <SourceLink className="sourcelink-wrapper" />
        </div>
      </div>
    );
  }

  componentDidMount() {
    ReactGA.pageview(window.location.pathname);
    if (
      window.location.href.split("/").pop() !==
        "?utm_source=dev&utm_medium=dev" &&
      (!process.env.NODE_ENV || process.env.NODE_ENV === "development")
    ) {
      window.location.href = "/?utm_source=dev&utm_medium=dev";
    }
  }
}
