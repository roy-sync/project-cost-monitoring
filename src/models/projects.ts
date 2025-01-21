import { Tasks } from "./task";

type Closed = "N" | "Y";
type Status = "delayed" | "warning" | "almost" | "on-time";
export type Projects = {
  id: number;
  title: string;
  cpi: number;
  spi: number;
  date_start: string;
  initial_date_closed: string;
  updated_date_closed: string;
  closed: Closed;
  status: Status;
  cost: number;
  actual_cost: number
  total_estimate: number;
  total_actual: number;
  cv: number;
  proposal_hours: number;
  tasks: Tasks[];
};
