import React, { Component, Fragment } from "react";
import { Query } from "@apollo/client/react/components";
import { PRODUCT_LIST } from "../query/queries";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import productImage from "../icons/Image.png";
import Cart from "../icons/empty-cart-icon-white.svg";

class CategoryPage extends Component {
  render() {
    const { category, currencySymbol } = this.props;
    const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);
    return (
      <div className="catg-page-container">
        <h2 className="category-title">{categoryTitle}</h2>
        <div className="catg-products-container">
          <Query query={PRODUCT_LIST}>
            {({ loading, error, data }) => {
              if (loading) return <div>Loading</div>;
              if (error) return <div>Error! {error.message}</div>;
              else {
                const categories = data.categories.map((category) => category);
                const { products } = categories.find(
                  (category) => category.name === this.props.category
                );
                return products.map((product) => {
                  const productPrice = product.prices.find(
                    (currency) => currency.currency.symbol === currencySymbol
                  );
                  return (
                    <div key={product.id} className="product-card">
                      {product.inStock ? (
                        <Fragment>
                          <div className="catg-product-image-container">
                            <Link to={`/product/${product.id}`}>
                              <img
                                className="catg-product-image"
                                src={product.gallery[0]}
                                alt={`a ${product.name} `}
                                onError={(event) => {
                                  event.target.src = productImage;
                                  event.onerror = null;
                                }}
                              />
                            </Link>
                          </div>
                          <span className="catg-cart-span">
                            <img src={Cart} alt="cart-icon" />
                          </span>
                        </Fragment>
                      ) : (
                        <div className="catg-product-image-container">
                          <span className="out-of-stock">
                            <p>OUT OF STOCK</p>
                            <Link to={`/product/${product.id}`}>
                              <img
                                className="catg-product-image"
                                src={product.gallery[0]}
                                alt={`a ${product.name} `}
                                onError={(event) => {
                                  event.target.src = productImage;
                                  event.onerror = null;
                                }}
                              />
                            </Link>
                          </span>
                        </div>
                      )}
                      <footer>
                        {product.name} <br />
                        <p>
                          {currencySymbol}
                          {productPrice.amount}
                        </p>
                      </footer>
                    </div>
                  );
                });
              }
            }}
          </Query>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  category: state.products.category,
  currencySymbol: state.currency.defaultCurrency,
});

export default connect(mapStateToProps)(CategoryPage);
