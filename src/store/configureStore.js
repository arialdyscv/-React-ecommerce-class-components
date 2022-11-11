import { configureStore } from "@reduxjs/toolkit";
import ModalReducer from "../redux/modal-reducer";
import CurrencyReducer from "../redux/currency-reducer";
import CartReducer from "../redux/cart-reducer";
import ProductsReducer from "../redux/products-reducer";

export const store = configureStore({
  reducer: {
    modal: ModalReducer,
    currency: CurrencyReducer,
    cart: CartReducer,
    products: ProductsReducer,
  },
});

export default store;
