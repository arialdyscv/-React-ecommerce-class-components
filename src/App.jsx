import React, { Component, Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import NavBar from "./components/NavBar";
import "./styles/styles.scss";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="categories/:categoryId" element={<CategoryPage />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="cart-page" element={<CartPage />} />
        </Routes>
      </Fragment>
    );
  }
}
