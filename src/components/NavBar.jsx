import React, { Component } from "react";
import { Query } from "@apollo/client/react/components";
import { connect } from "react-redux";
import { ReactComponent as Logo } from "../icons/brand-icon.svg";
import CartModal from "./modals/CartModal";
import CurrencyModal from "./modals/CurrencyModal";
import { setCategory } from ".././redux/products-reducer";
import { CATEGORIES } from "../query/queries";
import { NavLink } from "react-router-dom";

export class Navbar extends Component {
  render() {
    return (
      <div className="nav-container">
        <Query query={CATEGORIES}>
          {({ loading, error, data }) => {
            if (loading || error) {
              return null;
            } else {
              return (
                <div className="categories">
                  {data.categories.map((category) => {
                    return (
                      <NavLink
                        to={`categories/${category.name}`}
                        key={category.name}
                        onClick={() => this.props.setCategory(category.name)}
                        className={({ isActive }) =>
                          isActive ? "nav-link-active" : "nav-link"
                        }
                      >
                        <span>{category.name.toUpperCase()}</span>
                      </NavLink>
                    );
                  })}
                </div>
              );
            }
          }}
        </Query>
        <div className="middle-nav">
          <NavLink to="/">
            <Logo />
          </NavLink>
        </div>
        <div className="left-nav">
          <div>
            <CurrencyModal />
          </div>
          <div>
            <CartModal />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  category: state.products.category,
});

const mapDispatchToProps = { setCategory };

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
