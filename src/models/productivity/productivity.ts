import { Tasks } from "../task";

export type Productivity = {
    assignedTo: string;
    createdBy: string;
    projectName: string;
    tag: string;
    totalEstimate: string;
    totalTimeSpent: string;
    tasks?: Tasks
    originalEstimate: string;
}

