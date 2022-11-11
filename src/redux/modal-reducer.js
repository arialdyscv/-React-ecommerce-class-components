import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    show: false,
  },
  reducers: {
    showModal: (state) => {
      state.show = !state.show;
    },
  },
});

const { actions, reducer } = modalSlice;
export const { showModal } = actions;

export default reducer;
