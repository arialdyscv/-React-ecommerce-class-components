import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import { ReactComponent as CartIcon } from "../../icons/empty-cart-icon.svg";
import {
  showCartModal,
  minusProduct,
  addProduct,
  getTotals,
} from "../../redux/cart-reducer";
import CartOverlay from "./CartOverlay";
import { Link } from "react-router-dom";

class CartModal extends PureComponent {
  handleOutsideClick = (e) => {
    if (!this.node.contains(e.target)) {
      this.handleClick();
    }
  };

  handleClick = () => {
    if (!this.props.showCart) {
      document.addEventListener("click", this.handleOutsideClick, false);
    } else {
      document.removeEventListener("click", this.handleOutsideClick, false);
    }
    this.props.showCartModal();
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
    } = this.props;

    return (
      <Fragment>
        <div
          ref={(node) => {
            this.node = node;
          }}
        >
          <button
            className="cart"
            onClick={() => {
              const currentPage = window.location.pathname.split("/")[1];
              if (currentPage !== "cart-page") {
                this.handleClick();
              }
            }}
          >
            {cartTotalQuantity > 0 ? (
              <span badge={cartTotalQuantity}>{<CartIcon />}</span>
            ) : (
              <CartIcon />
            )}
          </button>
        </div>
        {!this.props.showCart ? null : (
          <Fragment>
            <CartOverlay />
            <div className="modal-container">
              <div className="modal-title">
                <p>
                  My Bag,{" "}
                  <span className="items-count">{cartTotalQuantity} items</span>
                </p>
              </div>
              <div className="modal-product-list">
                {cartProducts.length > 0 ? (
                  cartProducts.map((product) => {
                    return (
                      <Fragment>
                        <div className="modal-products-container">
                          <div className="modal-product-details">
                            <div className="modal-product-name">
                              <p>{product.brand}</p>
                              <p>{product.name}</p>
                            </div>
                            <div className="modal-product-price">
                              {currencySymbol}
                              {(product.amount * product.cartQuantity).toFixed(
                                2
                              )}
                            </div>

                            {Object.keys(product.attributes).map((key) => {
                              return key === "Color" ? (
                                <Fragment>
                                  <p className="modal-attributes-tittle">
                                    {key}:
                                  </p>
                                  <div
                                    className="modal-attributes"
                                    style={{
                                      background: `${product.attributes[key]}`,
                                    }}
                                  ></div>
                                </Fragment>
                              ) : (
                                <Fragment>
                                  <p className="modal-attributes-tittle">
                                    {key}:
                                  </p>
                                  <div className="modal-attributes">
                                    {key === "Color"
                                      ? null
                                      : product.attributes[key]}
                                  </div>
                                </Fragment>
                              );
                            })}
                          </div>
                          <div className="modal-product-quantity">
                            <button
                              onClick={(e) => {
                                addProduct(product);
                                getTotals();
                              }}
                              className="quantity-btn"
                            >
                              +
                            </button>
                            {product.cartQuantity}
                            <button
                              onClick={(e) => {
                                minusProduct(product);
                                getTotals();
                              }}
                              className="quantity-btn"
                            >
                              –
                            </button>
                          </div>
                          <div className="modal-product-image">
                            <img
                              width={121}
                              className="image"
                              src={product.gallery[0]}
                              alt="product"
                            />
                          </div>
                        </div>
                      </Fragment>
                    );
                  })
                ) : (
                  <div className="modal-empty">
                    <p>Cart is empty...</p>
                  </div>
                )}
                <div className="total-price">
                  <p>Total</p>
                  <p>
                    {currencySymbol}
                    {cartTotalAmount}
                  </p>{" "}
                </div>
              </div>

              <footer className="modal-footer">
                <Link to="cart-page">VIEW BAG</Link>
                <Link>CHECK OUT</Link>
              </footer>
            </div>
          </Fragment>
        )}
      </Fragment>
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
};
export default connect(mapStateToProps, mapDispatchToProps)(CartModal);
