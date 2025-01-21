import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { RootState } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";

const barData = [
  {
    name: "1",
    attendance: 4000,
    spent: 2400,
  },
  {
    name: "2",
    attendance: 3000,
    spent: 1398,
  },
  {
    name: "3",
    attendance: 2000,
    spent: 5800,
  },
  {
    name: "4",
    attendance: 2780,
    spent: 3908,
  },
  {
    name: "5",
    attendance: 1890,
    spent: 4800,
  },
  {
    name: "6",
    attendance: 2390,
    spent: 3800,
  },
  {
    name: "7",
    attendance: 3490,
    spent: 4300,
  },
  {
    name: "8",
    attendance: 3490,
    spent: 4300,
  },
  {
    name: "9",
    attendance: 3490,
    spent: 4300,
  },
  {
    name: "10",
    attendance: 3490,
    spent: 4300,
  },
  {
    name: "11",
    attendance: 3490,
    spent: 4300,
  },
  {
    name: "12",
    attendance: 3490,
    spent: 4300,
  },
  {
    name: "13",
    attendance: 3490,
    spent: 4300,
  },
  {
    name: "15",
    attendance: 3490,
    spent: 4300,
  },
  {
    name: "16",
    attendance: 3490,
    spent: 4300,
  },
];

export const Timespent = () => {
  const dataSelector = (state: RootState) => state.attendance.graphData;

  const graphData = useSelector(dataSelector);

  const widthValue =
    graphData.length == 1 ? "40%" : graphData.length == 2 ? "80%" : "100%";

  return (
    <div className='mb-5 h-64 w-full'>
      <ResponsiveContainer width={widthValue} height='100%'>
        <BarChart
          width={300}
          height={300}
          data={graphData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey='name.first' />
          <YAxis />
          <Tooltip />
          <Bar dataKey='timespent' fill='#f97316' name='Time Spent' />
          <Bar dataKey='attendance' fill='#16a34a' name='Attendance' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
