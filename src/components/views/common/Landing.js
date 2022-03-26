import React, {Component} from 'react';
import './../../../stylesheets/Landing.css';

/**
 * Landing Component
 */
export default class Landing extends Component {
  /**
   * react render override
   * @return {Component}
   */
  render() {
    return (
      <div className={this.props.className + '-div'}>
        <header className={this.props.className + '-header'}>
          <img
            src={this.props.logo}
            className={this.props.className + '-logo'}
            alt="logo"
          />
          <h1>{this.props.header}</h1>
          <p className={this.props.className + '-signature'}>
            {this.props.signature}
          </p>
        </header>
      </div>
    );
  }
}
Landing.propTypes = {
  className: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  signature: PropTypes.string.isRequired,
};
