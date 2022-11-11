import { createSlice } from "@reduxjs/toolkit";

const currencySlice = createSlice({
  name: "currency",
  initialState: {
    defaultCurrency: "$",
  },
  reducers: {
    setCurrency: (state, action) => {
      state.defaultCurrency = action.payload;
    },
  },
});

const { actions, reducer } = currencySlice;
export const { setCurrency } = actions;

export default reducer;
