import { configureStore, getDefaultMiddleware  } from "@reduxjs/toolkit";
import counterReducer from "@/redux/features/sample-slice";
import dashboardReducer from "@/redux/features/dashboard-slice";
import headerReducer from "@/redux/features/header-slice";
import drawerReducer from "@/redux/features/drawer-slice";
import filterReducer from "@/redux/features/filters-slice";
import attendanceReducer from '@/redux/features/attendance-slice';
import yearlyReducer from '@/redux/features/yearly-slice';
import productivitySlic2V2 from "./features/productivity-slic2-v2";
import thunk from 'redux-thunk';
import employeeReducer from "./features/employee-slice";


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    dashboard: dashboardReducer,
    header: headerReducer,
    drawer: drawerReducer,
    filter: filterReducer,
    attendance: attendanceReducer,
    yearly: yearlyReducer,
    productivityV2: productivitySlic2V2,
    employee: employeeReducer
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
