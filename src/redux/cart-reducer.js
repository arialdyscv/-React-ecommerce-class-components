import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    showCart: false,
    cartProducts: [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
  },
  reducers: {
    showCartModal: (state) => {
      state.showCart = !state.showCart;
    },

    addProduct: (state, action) => {
      const productIndex = state.cartProducts.findIndex(
        (product) =>
          product.id === action.payload.id &&
          JSON.stringify(product.attributes) ===
            JSON.stringify(action.payload.attributes)
      );
      if (productIndex >= 0) {
        state.cartProducts[productIndex].cartQuantity += 1;
        state.cartTotalQuantity += 1;
      } else if (Object.keys(action.payload.attributes).length >= 0) {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartProducts.push(tempProduct);
        state.cartTotalQuantity += 1;
      }
    },

    minusProduct: (state, action) => {
      const productIndex = state.cartProducts.findIndex(
        (product) =>
          product.id === action.payload.id &&
          JSON.stringify(product.attributes) ===
            JSON.stringify(action.payload.attributes)
      );

      if (state.cartProducts[productIndex].cartQuantity > 1) {
        state.cartProducts[productIndex].cartQuantity -= 1;
        state.cartTotalQuantity -= 1;
      } else if (state.cartProducts[productIndex].cartQuantity <= 1) {
        const newCart = state.cartProducts.filter(
          (product) =>
            JSON.stringify(product.attributes) !==
            JSON.stringify(action.payload.attributes)
        );

        state.cartProducts = newCart;
        state.cartTotalQuantity -= 1;
      }
    },
    removeProduct: (state, action) => {
      const newCart = state.cartProducts.filter(
        (product) =>
          product.id !== action.payload.id &&
          JSON.stringify(product.attributes) !==
            JSON.stringify(action.payload.attributes)
      );
      state.cartProducts = newCart;
    },
    clearCart: (state) => {
      state.cartProducts = [];
      state.cartTotalQuantity = 0;
      state.cartTotalAmount = 0;
    },
    getTotals: (state) => {
      let { total, quantity } = state.cartProducts.reduce(
        (cartTotal, cartProduct) => {
          const { amount, cartQuantity } = cartProduct;
          const productTotal = amount * cartQuantity;
          cartTotal.total += productTotal;
          cartTotal.quantity += cartQuantity;
          return cartTotal;
        },
        { total: 0, quantity: 0 }
      );
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
  },
});

const { actions, reducer } = cartSlice;
export const {
  showCartModal,
  minusProduct,
  addProduct,
  removeProduct,
  getTotals,
  clearCart,
} = actions;

export default reducer;
