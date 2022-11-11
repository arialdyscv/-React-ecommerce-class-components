import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Arrow from "../icons/downward.svg";
import {
  showCartModal,
  minusProduct,
  addProduct,
  getTotals,
  clearCart,
} from "../redux/cart-reducer";

class CartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageIndex: 0,
    };
  }

  handlePrevImage = (product) => {
    this.setState(product.gallery[{ imageIndex: -1 }]);
  };

  handleNextImage = (product) => {
    this.setState(product.gallery[{ imageIndex: +1 }]);
  };
  render() {
    const {
      minusProduct,
      addProduct,
      cartTotalQuantity,
      cartProducts,
      currencySymbol,
      cartTotalAmount,
      getTotals,
      clearCart,
    } = this.props;
    return (
      <div className="cart-page-container">
        <div className="page-tittle">
          <h2>CART</h2>
        </div>
        <div className="cart-products-container">
          <Fragment>
            {cartProducts.length > 0 ? (
              cartProducts.map((product) => {
                return (
                  <div className="cart-product-container">
                    <div className="cart-product-info">
                      <div className="cart-product-brand">{product.brand}</div>
                      <div className="cart-product-name">{product.name}</div>
                      <div className="cart-product-price">
                        {currencySymbol}
                        {(product.amount * product.cartQuantity).toFixed(2)}
                      </div>

                      {Object.keys(product.attributes).map((key) => {
                        return key === "Color" ? (
                          <div className="cart-attributes">
                            <p className="cart-attributes-tittle">{key}:</p>
                            <div
                              className="cart-product-swatch"
                              style={{
                                background: `${product.attributes[key]}`,
                              }}
                            ></div>
                          </div>
                        ) : (
                          <div className="cart-attributes">
                            <p className="cart-attributes-tittle">{key}:</p>
                            <div className="cart-product-attributes">
                              {key === "Color" ? null : product.attributes[key]}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="cart-right-side">
                      <div className="cart-product-quantity">
                        <button
                          onClick={() => {
                            addProduct(product);
                            getTotals();
                          }}
                          className="quantity-btn"
                        >
                          +
                        </button>
                        {product.cartQuantity}
                        <button
                          onClick={() => {
                            minusProduct(product);
                            getTotals();
                          }}
                          className="quantity-btn"
                        >
                          –
                        </button>
                      </div>
                      <div className="cart-product-image">
                        <img
                          className="cart-image"
                          src={product.gallery[this.state.imageIndex]}
                          alt="product"
                        />
                        {this.state.imageIndex === 0 ? null : (
                          <button
                            className="left-btn"
                            onClick={() => this.handlePrevImage(product)}
                          >
                            <img src={Arrow} alt="prev" />
                          </button>
                        )}
                        {product.gallery.length < 2 ? null : (
                          <button
                            className="right-btn"
                            onClick={() => this.handleNextImage(product)}
                          >
                            <img src={Arrow} alt="next" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="go-back">
                <Link to="/categories/all">
                  YOUR CART IS EMPTY, GO BACK SHOPPING
                </Link>
              </div>
            )}
            <footer className="cart-page-footer">
              <div className="cart-total">
                <p>
                  Tax 21%:{" "}
                  <span>
                    {currencySymbol}
                    {(cartTotalAmount * 0.21).toFixed(2)}
                  </span>
                </p>
                <p>
                  Quantity: <span>{cartTotalQuantity}</span>
                </p>
                <p>
                  Total:{" "}
                  <span>
                    {currencySymbol}
                    {(cartTotalAmount + cartTotalAmount * 0.21).toFixed(2)}
                  </span>
                </p>
              </div>
              <div>
                <button onClick={() => clearCart()} className="clear-btn">
                  CLEAR CART
                </button>
              </div>
            </footer>
          </Fragment>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  showCart: state.cart.showCart,
  cartTotalQuantity: state.cart.cartTotalQuantity,
  cartProducts: state.cart.cartProducts,
  currencySymbol: state.currency.defaultCurrency,
  cartTotalAmount: state.cart.cartTotalAmount,
});

const mapDispatchToProps = {
  showCartModal,
  addProduct,
  minusProduct,
  getTotals,
  clearCart,
};
export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
