import React, {Component} from 'react';
import {Helmet} from 'react-helmet';
import logo from '../../assets/PortfolioLogo.svg';
import {pageChange} from '../../common/GoogleAnalytics';
import Landing from '../common/Landing';
import SocialBar from '../common/SocialBar';
import SourceLink from '../common/SourceLink';
import './../../../stylesheets/PortfolioHome.css';


/**
 * PortfolioHome component
 */
export default class PortfolioHome extends Component {
  /**
   * react render override
   * @return {JSX.Element}
   */
  render() {
    const contactContent = [
      {
        contactContent: 'github',
        contactLink: 'https://github.com/marmig0404',
      },
      {
        contactContent: 'mail',
        contactLink: 'mailto:marmig0404@gmail.com',
      },
      {
        contactContent: 'linkedin',
        contactLink: 'https://www.linkedin.com/in/martinmiglio',
      },
      {
        contactContent: 'thingiverse',
        contactLink: 'https://www.thingiverse.com/marmig0404/',
      },
    ];

    return (
      <div className="portfolio-wrapper">
        <Helmet>
          <title>{'Martin Miglio'}</title>
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
  /**
   * handle page change on mount
   */
  componentDidMount() {
    pageChange('/#/');
  }
}
