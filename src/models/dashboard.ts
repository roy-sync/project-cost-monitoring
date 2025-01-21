export type Dashboard = {
  timeline: {
    onTime: number;
    delayed: number;
    almost: number;
    warning: number;
  };
  timeline_v2: {
    onTime: number;
    delayed: number;
    onhold: number;
    cancel: number;
  };
  count_active: number;
  profit: {
    income: number;
    loss: number;
  };
  cost_recovery: {
    full: number;
    partial: number;
    potential: number;
    subsidized: number;
  };
  cpi_count: {
    positive: number;
    negative: number;
  };
  spi_count: {
    positive: number;
    negative: number;
  };
  annual_current: {
    success: number;
    failed: number;
  };
  annual_prev: {
    success: number;
    failed: number;
  };
  financial_status: {
    loss: number;
    income: number;
    onhold: number;
    full: number;
    partial25: number;
    partial50: number;
  };
};
