import React, {Component} from 'react';
import {sourceLinkEvent} from '../../common/GoogleAnalytics';
import './../../../stylesheets/SourceLink.css';


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
          onClick={() => sourceLinkEvent()}
        >
          {'View Source Code'}
        </a>
      </div>
    );
  }
}
