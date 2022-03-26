import React, {Component} from 'react';
import ReactGA from 'react-ga';
import {v4 as uuidv4} from 'uuid';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import
{
  faTwitter,
  faLinkedinIn,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import {faEnvelope, faCube} from '@fortawesome/free-solid-svg-icons';

import './../../../stylesheets/SocialBar.css';

/**
 * click event handler
 * @param {string} contactContent Name of contact event
 */
function onLinkClick(contactContent) {
  ReactGA.event({
    category: 'User',
    action: `Clicked social: ${contactContent}`,
  });
}

/**
 *  get fontawesome defenition from string
 * @param {string} contactContent Name of contact
 * @return {IconDefinition}
 */
function getIcon(contactContent) {
  switch (contactContent) {
    case 'twitter':
      return faTwitter;
    case 'linkedin':
      return faLinkedinIn;
    case 'mail':
      return faEnvelope;
    case 'github':
      return faGithub;
    case 'thingiverse':
      return faCube;
    default:
      return null;
  }
}
/**
 * SocialBar Component
 */
export default class SocialBar extends Component {
  /**
   * react render override
   * @return {Component}
   */
  render() {
    const contentList = this.props.contentList;
    return (
      <div className="sb-wrapper">
        {contentList.map((item) => (
          <div className="cell" key={uuidv4()}>
            <span role="img" aria-labelledby={item.contactContent}>
              <a
                className={'icon-link'}
                href={item.contactLink}
                onClick={() => onLinkClick(item.contactContent)}
              >
                <FontAwesomeIcon
                  className={'icon'}
                  icon={getIcon(item.contactContent)}
                />
                <div />
              </a>
            </span>
          </div>
        ))}
      </div>
    );
  }
}
SocialBar.propTypes = {
  contentList: PropTypes.string.isRequired,
  contactContent: PropTypes.string.isRequired,
};
