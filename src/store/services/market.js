import { createSlice } from "@reduxjs/toolkit";

const market = createSlice({
  name: "market",
  initialState: {
    products: [],
  },
  reducers: {
    fetchProducts: (state, action) => {
      state.products.push(action.payload);
    },
  },
});

export const { fetchProducts } = market.actions;
export default market.reducer;
