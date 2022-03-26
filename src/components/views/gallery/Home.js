import React, {Component} from 'react';
import {reactGAPageChange} from '../../common/ReactGAUtil';
import {Helmet} from 'react-helmet';

import './../../../stylesheets/GalleryHome.css';

import Landing from '../common/Landing';
import SourceLink from '../common/SourceLink';
// import Carousel from 'react-instagram-carousel';

// import logo from "../../assets/temp_gallery.png";

/**
 * GalleryHome component (WIP!)
 */
export default class GalleryHome extends Component {
  /**
   * react render override
   * @return {Component}
   */
  render() {
    /*
    //get all iamges from image_folder
    const image_folder = './..//../assets/gallery/'
    var images = []
    const fs = require('fs');
    fs.readdir(image_folder, (err, files) => {
        files.forEach(image_path => {
            images.push(image_path);
        });
    });
    */

    return (
      <div className="gallery-wrapper">
        <Helmet>
          <title>{'Miglio Sights'}</title>
        </Helmet>
        <div className="gallery-content">
          <Landing
            logo="https://lh3.googleusercontent.com/pw/AM-JKLWl0VLclBpsVzc1qoK2xVRaRAJ91S9MG6HQDPAHmToQosTMVC_uOGgY8CaK6JpRt9zdHJzeO--a5-qQDU41j6fQuzCed5jQZIriMNdXa8OT5xYzj9YRXlAJJTP_9WLpXhuWpIkZSAxn9Xa2HaJfFxiI2g=w1421-h947-no?authuser=0"
            header="Come back soon!"
            signature="Check Twitter for updates"
            className="gallery-landing"
          />
        </div>
        <div className="gallery-footer">
          <SourceLink className="sourcelink-wrapper" />
        </div>
      </div>
    );
  }
  /**
   * handle page change on mount
   */
  componentDidMount() {
    reactGAPageChange('/#/gallery/');
  }
}
