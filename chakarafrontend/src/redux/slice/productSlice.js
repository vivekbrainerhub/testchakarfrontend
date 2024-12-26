import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],

};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      console.log(action.payload);
      state.categories = action.payload;
    },

    setReset: (state) => {
      state.categories = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCategories } = productSlice.actions;

export default productSlice.reducer;
