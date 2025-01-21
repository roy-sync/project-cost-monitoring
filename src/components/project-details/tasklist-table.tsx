import { DataTable } from "@/components/table/data-table";
import { TaskColumns } from "./task-column";
import { Tasks } from "@/models/task";

type TaskListProps = {
  task: Tasks[];
  projectId: number;
};

const TaskListTable = ({ task, projectId }: TaskListProps) => {
  return (
    <div className='p-4'>
      <DataTable columns={TaskColumns} data={task} projectId={projectId} />
    </div>
  );
};

export default TaskListTable;
