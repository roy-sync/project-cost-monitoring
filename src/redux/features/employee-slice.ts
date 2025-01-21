import { Employee } from "@/models/employee/employee";
import { createSlice } from "@reduxjs/toolkit";



type DrawerState = {
  employee: Employee[];
};

const initialState: DrawerState = {
  employee: [],
};

export const employee = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    initEmp: (state, action) => {

      state.employee = [];
      state.employee = action.payload.data;

      console.log(state.employee);
    },

  },
});

export const { initEmp } = employee.actions;
export default employee.reducer;
