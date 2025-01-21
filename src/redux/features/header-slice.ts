import { createSlice } from "@reduxjs/toolkit";

type DrawerState = {
  isDrawerOpen: boolean;
};

const initialState: DrawerState = {
  isDrawerOpen: false,
};

export const header = createSlice({
  name: "header",
  initialState,
  reducers: {
    toggleDrawerState: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
  },
});

export const { toggleDrawerState } = header.actions;
export default header.reducer;
