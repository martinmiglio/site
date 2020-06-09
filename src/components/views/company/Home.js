import React, { Component } from "react";
import "./../../../stylesheets/CompanyHome.css";
import SocialBar from "../common/SocialBar";
import Landing from "../common/Landing";
import logo from "../../assets/DDCLogo1.png";

export default class CompanyHome extends Component{
    render(){
        const contactContent = [
            {
              contactType: "twitter",
              contactLink: "https://twitter.com/digidevllc"
            },
            {
              contactType: "envelope",
              contactLink: "mailto:mail@digidev.lcc"
            },
          ];
        return(
            <div className="company-wrapper">
                <Landing logo={logo} header="Come back soon!" signature="Check Twitter for updates or email" className="company-landing"/>
                <SocialBar contentList={contactContent} className="social" color="#282c34"/>              
            </div>
        );
    }
}