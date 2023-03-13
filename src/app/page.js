"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { pageChange, initializeGA } from "../GoogleAnalytics";
import backgroundImage from "../assets/frame_background.svg";
const Landing = dynamic(() => import("../components/Landing"));
const SocialBar = dynamic(() => import("../components/SocialBar"));
const SourceLink = dynamic(() => import("../components/SourceLink"));

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

export default function PortfolioHome() {
  useEffect(() => {
    initializeGA();
    pageChange(window.location.pathname);
  }, []);

  const animDuration = 5000;
  const maxAnim = 45;
  const minAnim = 0;
  const [anim, setAnim] = useState(minAnim);
  useEffect(() => {
    setAnim(maxAnim);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setAnim(anim === minAnim ? maxAnim : minAnim);
    }, animDuration);
  }, [anim]);

  const wrapperStyle = {
    display: "flex",
    flexFlow: "column",
    alignItems: "center",
    minHeight: "100vh",
    maxWidth: "100vw",
    backgroundImage: `url(${backgroundImage.src})`,
  };

  const filter = `
    blur(max(10vw , ${anim}px))
    hue-rotate(${-1 * anim}deg)
    saturate(150%)
  `;

  const contentStyle = {
    height: "100vh",
    width: "100vw",
    backdropFilter: filter,
    WebkitBackdropFilter: filter,
    transition: `all ${animDuration}ms ease-in-out`,
    display: "flex",
    flexFlow: "column",
  };

  const footerStyle = {
    flexShrink: 0,
    textAlign: "center",
    padding: "10px",
    marginTop: "auto",
  };

  return (
    <div style={wrapperStyle}>
      <Header
        title="Martin Miglio"
        decsription="My Portfolio"
        keywords="Martin Miglio Portfolio"
        url="https://martinmiglio.dev/"
      />
      <div style={contentStyle}>
        <Landing header="Martin Miglio" signature="Check out my links" />
        <SocialBar contentList={contactContent} />
        <div style={footerStyle}>
          <SourceLink />
        </div>
      </div>
    </div>
  );
}
