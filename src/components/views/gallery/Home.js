import React, { Component } from "react";
import { Helmet } from "react-helmet";
import Landing from "../common/Landing";
//import logo from "../../assets/temp_gallery.png";
// import Carousel from 'react-instagram-carousel';
import "./../../../stylesheets/GalleryHome.css";

export default class GalleryHome extends Component {
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
          <title>{"Miglio Sights"}</title>
        </Helmet>
        <Landing
          logo="https://lh3.googleusercontent.com/pw/AM-JKLWl0VLclBpsVzc1qoK2xVRaRAJ91S9MG6HQDPAHmToQosTMVC_uOGgY8CaK6JpRt9zdHJzeO--a5-qQDU41j6fQuzCed5jQZIriMNdXa8OT5xYzj9YRXlAJJTP_9WLpXhuWpIkZSAxn9Xa2HaJfFxiI2g=w1421-h947-no?authuser=0"
          header="Come back soon!"
          signature="Check Twitter for updates"
          className="gallery-landing"
        />
      </div>
    );
  }
}
