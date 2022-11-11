import React, { PureComponent } from "react";
import { connect } from "react-redux";

class CartOverlay extends PureComponent {
  render() {
    return <div className="overlay"></div>;
  }
}

const mapStateToProps = (state) => ({
  showCart: state.cart.showCart,
});

export default connect(mapStateToProps)(CartOverlay);
