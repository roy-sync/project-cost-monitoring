import { Tasks } from '@/models/task';
import React from 'react';
import { Tooltip, IconButton } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

interface ModalProps {
  tasks: Tasks[];
  onClose: () => void;
}

const ModalTasks: React.FC<ModalProps> = ({ tasks, onClose }) => {

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto flex items-center justify-center">
      <div className="bg-gray-500 bg-opacity-75 absolute inset-0" onClick={onClose}></div>
      <div className="bg-white rounded-lg p-8 max-w-screen-xl w-full mx-auto relative">
        <div className="flex justify-between items-center">
          <div className='flex justify-between'>
            <h2 className="text-lg font-semibold pt-2">Tasks</h2>
            <Tooltip title="Task IDs displayed in red indicate that the task's estimated time was fully utilized in the previous month">
                <IconButton>
                    <HelpOutlineIcon />
                </IconButton>
            </Tooltip>
          </div>
          <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="mt-4 max-h-96 overflow-y-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Total Estimate</th>
                <th className="px-4 py-2">Total Estimate (reporting period)</th>
                <th className="px-4 py-2">Link</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr key={task.id}>
                  <td className="border px-4 py-2" style={{ color: task.isEstimateZero ? 'red' : 'inherit' }}>{task.task_id}</td>
                  <td className="border px-4 py-2">{task.taskName}</td>
                  <td className="border px-4 py-2">{Number(task.originalEstimate / 3600).toFixed(2)}</td>
                  <td className="border px-4 py-2">{Number(task.estimate / 3600).toFixed(2)}</td>
                  <td className="border px-4 py-2">
                    <a href={task.link} target="_blank" className="text-blue-500 hover:text-blue-700 hover:underline">
                      Task Link
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ModalTasks;
