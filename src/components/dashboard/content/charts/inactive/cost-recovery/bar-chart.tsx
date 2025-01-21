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

interface CostRecoveryBarChartProps {
  fullCostRecovery: number;
  partialCostRecovery: number;
  potentialLost: number;
  subsidized: number;
}

export const CostRecoveryBarChart = ({
  fullCostRecovery,
  partialCostRecovery,
  potentialLost,
  subsidized,
}: CostRecoveryBarChartProps) => {
  const gradientColors = ["#7AD3FF", "#4FBAF0"];
  const data = [
    {
      name: "FCR",
      value: fullCostRecovery,
    },
    {
      name: "PCR",
      value: partialCostRecovery,
    },
    {
      name: "PL",
      value: potentialLost,
    },
    {
      name: "Subsidized",
      value: subsidized,
    },
  ];

  return (
    <div className='mb-3 mt-8 h-64 w-full'>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart width={150} height={40} data={data}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Bar dataKey='value'>
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
