import React, {Component} from 'react';
import {Helmet} from 'react-helmet';
import logo from '../../assets/DDCLogo1.png';
import {pageChange} from '../../common/GoogleAnalytics';
import Landing from '../common/Landing';
import SocialBar from '../common/SocialBar';
import SourceLink from '../common/SourceLink';
import './../../../stylesheets/CompanyHome.css';

/**
 * CompanyHome component
 */
export default class CompanyHome extends Component {
  /**
   * react render override
   * @return {Component}
   */
  render() {
    const contactContent = [
      {
        contactContent: 'twitter',
        contactLink: 'https://twitter.com/digidevllc',
      },
      {
        contactContent: 'mail',
        contactLink: 'mailto:mail@digidev.llc',
      },
    ];
    return (
      <div className="company-wrapper">
        <Helmet>
          <title>{'DigiDev'}</title>
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
  /**
   * handle page change on mount
   */
  componentDidMount() {
    pageChange('/#/company/');
  }
}
