import { createSlice } from "@reduxjs/toolkit";

const ui = createSlice({
  name: "ui",
  initialState: {
    theme: "dark",
  },
  reducers: {
    themeChanged: (state, action) => {
      state.theme = action.payload.theme;
    },
  },
});

// Actions
export const { themeChanged } = ui.actions;

// Reducer
export default ui.reducer;
