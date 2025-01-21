import React, { ReactNode } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface PieChartData {
  name: string;
  value: number;
  color: string;
}

interface DynamicPieChartProps {
  data: PieChartData[];
}

export const ProductivityPieChart = ({ data }: DynamicPieChartProps) => {
  return (
    <div className='h-64 w-full'>
      {data.length !== 0 ? (
        <p className="text-gray-500 text-center text-xs mt-3 font-semibold mb-2">Total Tasks Per Project</p>
      ) : null}
      <ResponsiveContainer width='100%' height='100%'>
        <PieChart>
          <Pie
            data={data}
            cx='50%'
            cy='50%'
            labelLine={false}
            outerRadius={100}
            fill='#8884d8'
            dataKey='value'
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />

        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
