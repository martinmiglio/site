import React, {Component} from 'react';
import ReactGA from 'react-ga';

import './../../../stylesheets/SourceLink.css';

/**
 * click event handler
 */
function onLinkClick() {
  ReactGA.event({category: 'User', action: 'Clicked source link'});
}
/**
 * SourceLink component
 */
export default class SourceLink extends Component {
/**
 * rect render override
 * @return {Component}
 */
  render() {
    return (
      <div className="sourcelink-wrapper">
        <a
          className="sourcelink"
          href="https://github.com/marmig0404/portfolio/"
          id="bottom"
          onClick={() => onLinkClick()}
        >
          {'View Source Code'}
        </a>
      </div>
    );
  }
}
