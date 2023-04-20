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
    contactLink: "mailto:contact@martinmiglio.dev",
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

  const filter = `
    blur(30px)
    hue-rotate(${-1 * anim}deg)
    saturate(150%)
  `;

  const wrapperStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
  };

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage.src})`,
    transform: "scale(2.0)", // remove the white border on blur
    filter: filter,
    WebkitFilter: filter,
    transition: `filter, -webkit-filter ${animDuration}ms ease-in-out`,
    height: "100%",
    width: "100%",
  };

  const contentStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100vh",
    width: "100vw",
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
      <div style={backgroundStyle} />
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
