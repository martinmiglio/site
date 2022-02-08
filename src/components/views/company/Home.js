import React, { Component } from "react";
import ReactGA from "react-ga";
import { Helmet } from "react-helmet";

import "./../../../stylesheets/CompanyHome.css";

import SocialBar from "../common/SocialBar";
import Landing from "../common/Landing";
import SourceLink from "../common/SourceLink";

import logo from "../../assets/DDCLogo1.png";

export default class CompanyHome extends Component {
  render() {
    const contactContent = [
      {
        contactContent: "twitter",
        contactLink: "https://twitter.com/digidevllc",
      },
      {
        contactContent: "mail",
        contactLink: "mailto:mail@digidev.llc",
      },
    ];
    return (
      <div className="company-wrapper">
        <Helmet>
          <title>{"DigiDev"}</title>
        </Helmet>
        <div className="company-content">
          <Landing
            logo={logo}
            header="Come back soon!"
            signature="Check Twitter for updates or email"
            className="company-landing"
          />
          <SocialBar
            contentList={contactContent}
            className="social"
            color="#282c34"
          />
        </div>
        <div className="company-footer">
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
      window.location.href = "/#/company/?utm_source=dev&utm_medium=dev";
    }
  }
}
