import React, { Component } from "react";
import { Helmet } from "react-helmet";
import "./../../../stylesheets/PortfolioHome.css";
import Landing from "../common/Landing";
import SocialBar from "../common/SocialBar";
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
        <Landing
          className="portfolio-landing"
          logo={logo}
          header="Martin Miglio"
          signature="Welcome to my page"
        />
        <SocialBar contentList={contactContent} className="social" />
      </div>
    );
  }
}
