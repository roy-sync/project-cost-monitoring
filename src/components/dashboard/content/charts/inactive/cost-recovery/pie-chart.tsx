import React, { ReactNode } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface DataItem {
  name: string;
  value: number;
}

interface CustomizedLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}

interface CostRecoveryPieChartPRops {
  fullCostRecovery: number;
  partialCostRecovery: number;
  potentialLost: number;
  subsidized: number;
}

// enum Colors{
//   GREEN = '#10b981',
//   YELLOW = '#10b981',
//   YELLOW = '#10b981',
// }
const COLORS = ["#10b981", "#eab308", "#f97316", "#ef4444"];

const RADIAN = Math.PI / 180;

export const CostRecoveryPieChart = ({
  fullCostRecovery,
  partialCostRecovery,
  potentialLost,
  subsidized,
}: CostRecoveryPieChartPRops) => {
  const data: DataItem[] = [
    { name: "Full Cost Recovery", value: fullCostRecovery },
    { name: "Partial Cost Recovery", value: partialCostRecovery },
    { name: "Potential Lost", value: potentialLost },
    { name: "Subsidized", value: subsidized },
  ];
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: CustomizedLabelProps): ReactNode => {
    const dataItem = data[index];

    if (dataItem.value === 0) {
      return null; // Skip rendering label for zero values
    }

    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        className='text-white'
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline='central'
        fill='white'
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <div className='h-64 w-full'>
      <ResponsiveContainer width='100%' height='100%'>
        <PieChart>
          <Pie
            data={data}
            cx='50%'
            cy='50%'
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill='#8884d8'
            dataKey='value'
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
