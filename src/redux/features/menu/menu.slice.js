// store/menuSlice.js
import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    anchorEl: null,
  },
  reducers: {
    openMenu: (state, action) => {
      state.anchorEl = action.payload;
    },
    closeMenu: (state) => {
      state.anchorEl = null;
    },
  },
});

export const { openMenu, closeMenu } = menuSlice.actions;
export default menuSlice.reducer;
