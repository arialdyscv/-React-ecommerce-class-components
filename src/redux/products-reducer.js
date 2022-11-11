import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    category: "all",
    attributes: {},
  },
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },

    setAttributes(state, action) {
      state.attributes = { ...state.attributes, ...action.payload };
      console.log(action.payload);
    },

    resetAttribute(state) {
      state.attributes = {};
    },
  },
});

const { actions, reducer } = productsSlice;
export const { setCategory, setAttributes, resetAttribute } = actions;

export default reducer;
