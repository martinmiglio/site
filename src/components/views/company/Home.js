import React, { Component } from "react";
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
        contactType: "twitter",
        contactLink: "https://twitter.com/digidevllc",
      },
      {
        contactType: "envelope",
        contactLink: "mailto:mail@digidev.llc",
      },
    ];
    return (
      <div className="company-wrapper">
        <Helmet>
          <title>{"DigiDev"}</title>
        </Helmet>
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
        <SourceLink />
      </div>
    );
  }
}
