import React from "react";
import { initialize, pageview } from "react-ga";

import CollapsibleList from "./components/CollapsibleList";
import "./App.css";
import Landing from "./components/Landing";
import About from "./components/About"; /* */
import Education from "./components/Education";
import KULogo from "./components/assets/ketteringlogo.png";
import IAMLogo from "./components/assets/iamlogo.png";
import Experience from "./components/Experience";
import Portfolio from "./components/Portfolio";
import SocialBar from "./components/SocialBar";

export default function App() {
  initialize("UA-148190769-1");
  pageview("/portfolio");
  const educationContent = [
    {
      imageSource: KULogo,
      header: "Kettering University",
      body: "KU Body"
    },
    {
      imageSource: IAMLogo,
      header: "International Academy of Macomb",
      body: "IAM Body"
    }
  ];

  const aboutContent = {
    //imageSource:ProfilePic,
    header:"Martin Miglio",
    body:"About Body"
  };

  const contactContent = [
    {
      contactType: "github",
      contactLink: "https://github.com/marmig0404"
    },
    {
      contactType: "envelope",
      contactLink: "mailto:marmig0404@gmail.com"
    },
    {
      contactType: "linkedin",
      contactLink: "https://www.linkedin.com/in/martinmiglio"
    },
    {
      contactType: "cube",
      contactLink: "https://www.thingiverse.com/marmig0404/"
    }
  ];

  const collapsibleListContent = [
    {
      trigger: "About",
      content: <About contentList={aboutContent} />
    },
    {
      trigger: "Education",
      content: <Education contentList={educationContent} />
    },
    {
      trigger: "Experience",
      content: <Experience />
    },
    {
      trigger: "Portfolio",
      content: <Portfolio />
    }
  ];

  return (
    <div className="app-wrapper">
      <Landing />
      <SocialBar contentList={contactContent} className="social" />
      <CollapsibleList contentList={collapsibleListContent} className="list" />
    </div>
  );
}
