import React, { Component } from "react";

export default class ProductCard extends Component {
  render() {
    const { children } = this.props;
    return <div className="product-Card">{children}</div>;
  }
}
