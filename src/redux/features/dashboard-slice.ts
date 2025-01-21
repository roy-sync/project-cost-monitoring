import { Dashboard } from "@/models/dashboard";
import { createSlice } from "@reduxjs/toolkit";

type dashboardSlice = {
  showActiveProjects: boolean;
  costRecoveryShowBarChart: boolean;
  annualPerformanceShowBarChart: boolean;
  activeDashboardData: Dashboard;
  inactiveDashboardData: Dashboard;
};

const DashboardInitialData = {
  timeline: {
    onTime: 0,
    delayed: 0,
    almost: 0,
    warning: 0,
  },
  timeline_v2: {
    onTime: 0,
    delayed: 0,
    onhold: 0,
    cancel: 0,
  },
  count_active: 0,
  profit: {
    income: 0,
    loss: 0,
  },
  cost_recovery: {
    full: 0,
    partial: 0,
    potential: 0,
    subsidized: 0,
  },
  cpi_count: {
    positive: 0,
    negative: 0,
  },
  spi_count: {
    positive: 0,
    negative: 0,
  },
  annual_current: {
    success: 0,
    failed: 0,
  },
  annual_prev: {
    success: 0,
    failed: 0,
  },
  financial_status: {
    loss: 0,
    income: 0,
    onhold: 0,
    full: 0,
    partial25: 0,
    partial50: 0,
  },
};

const initialState: dashboardSlice = {
  showActiveProjects: false,
  costRecoveryShowBarChart: false,
  annualPerformanceShowBarChart: false,
  activeDashboardData: DashboardInitialData,
  inactiveDashboardData: DashboardInitialData,
};

export const dashboard = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    toggleActiveProjects: (state) => {
      state.showActiveProjects = !state.showActiveProjects;
    },
    toggleCostRecoveryChart: (state) => {
      state.costRecoveryShowBarChart = !state.costRecoveryShowBarChart;
    },
    toggleAnnualPerformanceChart: (state) => {
      state.annualPerformanceShowBarChart =
        !state.annualPerformanceShowBarChart;
    },
    setActiveDashboardData: (state, action) => {
      state.activeDashboardData = action.payload;
    },
    setInactiveDashboardData: (state, action) => {
      state.inactiveDashboardData = action.payload;
    },
  },
});

export const {
  toggleActiveProjects,
  toggleCostRecoveryChart,
  toggleAnnualPerformanceChart,
  setActiveDashboardData,
  setInactiveDashboardData,
} = dashboard.actions;
export default dashboard.reducer;
