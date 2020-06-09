import React, { Component } from "react";
import "./../../../stylesheets/PortfolioHome.css";
import Landing from "../common/Landing";
import SocialBar from "../common/SocialBar";
import logo from "../../assets/PortfolioLogo.svg"
/* 
import CollapsibleList from "./CollapsibleList";
import About from "./About";
import Education from "./Education";
import KULogo from "./assets/ketteringlogo.png";
import IAMLogo from "./assets/iamlogo.png";
import Experience from "./Experience";
*/


export default class PortfolioHome extends Component{
    render(){
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
        
          /*
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
            header: "Martin Miglio",
            body: "About Body"
          };
        
          const collapsibleListContent = [{
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
          ];
          */
        
          return (
            <div className="portfolio-wrapper" >
              <Landing className = "portfolio-landing" logo= {logo} header="Martin Miglio" signature="Welcome to my page" />
              <SocialBar contentList={contactContent} className="social" />
              {/*<CollapsibleList contentList={collapsibleListContent} className="list" />*/}
            </div>
          );
    }
}