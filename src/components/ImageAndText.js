import React, { Component } from "react";
import "./ImageAndText.css";

export default class ImageAndText extends Component {
  render() {
    const imageSource = this.props.imageSource;
    const text = this.props.text;
    const orientation = this.props.orientation;

    return (
      <div className={"wrapper-" + orientation}>
        <img className="image" src={imageSource} alt={String(imageSource)}/>
        <div className="text">{text}</div>
      </div>
    );
  }
}
