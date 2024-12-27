import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  subCategory: [],
  product: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setSubCategories: (state, action) => {
      state.subCategory = action.payload;
    },
    setProduct: (state, action) => {
      state.product = action.payload;
    },

    setReset: (state) => {
      state.categories = [];
      state.subCategory = [];
      state.product = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCategories, setSubCategories, setProduct, setReset } =
  productSlice.actions;

export default productSlice.reducer;
