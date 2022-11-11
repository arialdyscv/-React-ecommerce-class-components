import React, { Component } from "react";
import Carousel from "../components/Carousel";
import Banner1 from "../icons/Banner1.jpg";
import Banner2 from "../icons/Banner2.jpg";
import Banner3 from "../icons/Banner3.jpg";

export default class MainPage extends Component {
  render() {
    const style = {
      maxWidth: "100%",
      maxHeight: "600px",
    };
    return (
      <div className="main-page">
        <Carousel>
          <img style={style} src={Banner2} alt="placeholder" />
          <img style={style} src={Banner1} alt="placeholder" />
          <img style={style} src={Banner3} alt="placeholder" />
        </Carousel>
      </div>
    );
  }
}
