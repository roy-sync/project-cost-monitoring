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

const bar1Data = [
  {
    name: "Current",
    uv: 600,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Previous",
    uv: 500,
    pv: 1398,
    amt: 2210,
  },
];

const bar2Data = [
  {
    name: "Loss",
    uv: 30,
    pv: 1400,
    amt: 1400,
  },
  {
    name: "Income",
    uv: 500,
    pv: 2398,
    amt: 2210,
  },
];

export const AnnualPerformanceChart = () => {
  const gradientColors1 = ["#FFD572", "#FEBD38"];
  const gradientColors2 = ["#FF9364", "#F25F33"];

  return (
    <div className='mb-5 mt-10 h-64 w-full'>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart width={150} height={40} data={bar1Data}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Bar dataKey='pv' stackId='stack1' fill={`url(#gradient-1)`}>
            {bar1Data.map((entry, index) => (
              <Cell
                key={`cell-1-${index}`}
                fill={`url(#gradient-1-${index})`}
              />
            ))}
          </Bar>
          <Bar dataKey='uv' stackId='stack2' fill={`url(#gradient-2)`}>
            {bar2Data.map((entry, index) => (
              <Cell
                key={`cell-2-${index}`}
                fill={`url(#gradient-2-${index})`}
              />
            ))}
          </Bar>
          <defs>
            {gradientColors1.map((color, index) => (
              <linearGradient
                key={`gradient-1-${index}`}
                id={`gradient-1-${index}`}
                x1='0'
                y1='0'
                x2='0'
                y2='1'
              >
                <stop offset='0%' stopColor={gradientColors1[0]} />
                <stop offset='100%' stopColor={gradientColors1[1]} />
              </linearGradient>
            ))}
            {gradientColors2.map((color, index) => (
              <linearGradient
                key={`gradient-2-${index}`}
                id={`gradient-2-${index}`}
                x1='0'
                y1='0'
                x2='0'
                y2='1'
              >
                <stop offset='0%' stopColor={gradientColors2[0]} />
                <stop offset='100%' stopColor={gradientColors2[1]} />
              </linearGradient>
            ))}
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
