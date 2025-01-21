export type Tasks = {
  id: string;
  taskName: string;
  created_by: string;
  assigned_to: string;
  estimated: number;
  actual: number;
  tag: string;
  task_id: number;
  date_task: string;
  link: string;
  isEstimateZero: boolean;
  originalEstimate: number;
  estimate: number;
};
