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

type AnnualPerformanceBarChartProps = {
  successCurr: number;
  successPrev: number;
  failedCurr: number;
  failedPrev: number;
};

export const AnnualPerformanceBarChart = ({
  successCurr,
  successPrev,
  failedCurr,
  failedPrev,
}: AnnualPerformanceBarChartProps) => {
  const gradientColors1 = ["#FFD572", "#FEBD38"];
  const gradientColors2 = ["#FF9364", "#F25F33"];
  const currentData = [
    {
      name: "Current",
      uv: successCurr,
      pv: 2400,
    },
    {
      name: "Previous",
      uv: successPrev,
      pv: 1398,
    },
  ];

  const previousData = [
    {
      name: "Loss",
      uv: failedCurr,
      pv: 1400,
    },
    {
      name: "Income",
      uv: failedPrev,
      pv: 2398,
    },
  ];
  return (
    <div className='mb-5 mt-10 h-64 w-full'>
      <ResponsiveContainer width='  100%' height='100%'>
        <BarChart width={150} height={40} data={currentData}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Bar dataKey='pv' stackId='stack1' fill={`url(#gradient-1)`}>
            {currentData.map((entry, index) => (
              <Cell
                key={`cell-1-${index}`}
                fill={`url(#gradient-1-${index})`}
              />
            ))}
          </Bar>
          <Bar dataKey='uv' stackId='stack2' fill={`url(#gradient-2)`}>
            {previousData.map((entry, index) => (
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
