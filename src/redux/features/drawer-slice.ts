import { createSlice } from "@reduxjs/toolkit";
import { Projects } from "@/models/projects";

type DrawerState = {
  onTimeProjects: Projects[];
  delayedProjects: Projects[];
};

const initialState: DrawerState = {
  onTimeProjects: [],
  delayedProjects: [],
};

export const drawer = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    setOnTimeProjects: (state, action) => {
      state.onTimeProjects = action.payload;
    },
    setDelayedProjects: (state, action) => {
      state.delayedProjects = action.payload;
    },
  },
});

export const { setOnTimeProjects, setDelayedProjects } = drawer.actions;
export default drawer.reducer;
