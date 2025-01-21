import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Loss",
    uv: 80,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Income",
    uv: 60,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "100%",
    uv: 40,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "50%",
    uv: 20,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "25%",
    uv: 0,
    pv: 4800,
    amt: 2181,
  },
];

export const ProjectProjectionChart = () => {
  const gradientColors = ["#7AD3FF", "#4FBAF0"];

  return (
    <div className='mb-5 mt-10 h-64 w-full'>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart width={150} height={40} data={data}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Bar dataKey='uv'>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={`url(#gradient-${index})`} />
            ))}
          </Bar>
          <defs>
            {data.map((entry, index) => (
              <linearGradient
                key={`gradient-${index}`}
                id={`gradient-${index}`}
                x1='0'
                y1='0'
                x2='0'
                y2='1'
              >
                <stop offset='0%' stopColor={gradientColors[0]} />
                <stop offset='100%' stopColor={gradientColors[1]} />
              </linearGradient>
            ))}
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
