/* eslint-disable max-len */
import React, { Component } from "react";
import Head from "next/head";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      description: this.props.description,
      keywords: this.props.keywords,
      canonicalUrl: this.props.url,
    };
  }

  render() {
    return (
      <Head>
        <title>{this.state.title}</title>
        <meta charset="utf-8" />
        <meta name="description" content={this.state.description} />
        <meta name="keywords" content={this.state.keywords} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={this.state.title} />
        <meta property="og:description" content={this.state.description} />
        <meta property="og:site_name" content={this.state.title} />
        <meta name="theme-color" content="#282c34" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="twitter:card" content={this.state.description} />
        <meta property="twitter:title" content={this.state.title} />
        <meta property="twitter:description" content={this.state.description} />
        <link rel="canonical" href={this.state.canonicalUrl} />
        <meta httpEquiv="Cache-Control" content="max-age=86400" />
        <meta http-equiv="Permissions-Policy" content="interest-cohort=()" />
      </Head>
    );
  }
}
