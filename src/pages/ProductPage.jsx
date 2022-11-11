import React, { PureComponent } from "react";
import { Query } from "@apollo/client/react/components";
import { PRODUCT_INFO } from "../query/queries";
import { connect } from "react-redux";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import { addProduct, getTotals } from "../redux/cart-reducer";
import Attribute from "../components/Attributes/Attribute";
import { setAttributes, resetAttribute } from "../redux/products-reducer";

class ProductPage extends PureComponent {
  constructor(props) {
    super(props);
    this.changeImage = this.changeImage.bind(this);
    this.state = {
      imageIndex: 0,
    };
  }

  changeImage = (index) => {
    this.setState({ imageIndex: index });
  };

  render() {
    const currentId = window.location.pathname.split("/")[2];
    const {
      currencySymbol,
      productAttributes,
      addProduct,
      resetAttribute,
      getTotals,
    } = this.props;
    const handleAddProduct = (product) => {
      if (product.inStock) {
        addProduct(product);
        getTotals();
      }
      resetAttribute();
    };

    return (
      <div className="product-page-container">
        <Query query={PRODUCT_INFO(currentId)}>
          {({ loading, error, data }) => {
            if (loading) return <div>Loading...</div>;
            if (error) return <div>Error loading product info</div>;
            else {
              const productInfo = data.product;
              const productPrice = productInfo.prices.find(
                (price) => price.currency.symbol === currencySymbol
              );

              const cartProduct = {
                name: productInfo.name,
                brand: productInfo.brand,
                gallery: productInfo.gallery,
                id: productInfo.id,
                amount: productPrice.amount,
                symbol: currencySymbol,
                attributes: productAttributes,
                inStock: productInfo.inStock,
              };

              return (
                <div className="info-container">
                  <div className="thumbnail-container">
                    {productInfo.gallery.map((imageUrl, index) => {
                      return (
                        <img
                          onClick={() => this.changeImage(index)}
                          className="thumbnail"
                          key={index}
                          src={imageUrl}
                          alt="product"
                        />
                      );
                    })}
                  </div>
                  <div className="main-image-container">
                    <img
                      className="main-image"
                      src={productInfo.gallery[this.state.imageIndex]}
                      alt="product"
                    />
                  </div>
                  <div className="info-section-container">
                    <p className="product-name">{productInfo.name}</p>
                    <div className="attributes-container">
                      {productInfo.attributes.map((attribute) => {
                        return (
                          <Attribute key={attribute.id} attribute={attribute} />
                        );
                      })}
                    </div>
                    <div className="price-section-container">
                      <p className="price-tittle">PRICE:</p>
                      <p className="price-amount">
                        {currencySymbol}
                        {productPrice.amount}
                      </p>
                      <button
                        onClick={() => handleAddProduct(cartProduct)}
                        className="add-to-cart-btn"
                      >
                        ADD TO CART
                      </button>
                    </div>
                    <div className="product-description-container">
                      {parse(
                        DOMPurify.sanitize(productInfo.description, {
                          USE_PROFILES: { html: true },
                        })
                      )}
                    </div>
                  </div>
                </div>
              );
            }
          }}
        </Query>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  productCategory: state.products.category,
  itemsCount: state.cart.itemsCount,
  currencySymbol: state.currency.defaultCurrency,
  productAttributes: state.products.attributes,
  cartProducts: state.cart.cartProducts,
});

const mapDispatchToProps = {
  addProduct,
  setAttributes,
  resetAttribute,
  getTotals,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
