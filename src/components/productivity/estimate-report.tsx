import React from "react";
import { Doughnut } from "react-chartjs-2";

interface DoughnutChartProps {
  tagsTotalLabel: string[];
  data: any; // Adjust the type based on the actual structure of your data
  options: any; // Adjust the type based on the actual structure of your options
  plugins: any;
}

const EstimateChart: React.FC<DoughnutChartProps> = ({
  tagsTotalLabel,
  data,
  options,
  plugins,
}) => {
  return (
    <div className='w-full'>
      <div className='flex items-center justify-center'>
        <Doughnut
          data={data}
          width={500}
          height={800}
          options={options}
          plugins={plugins}
        />
      </div>
    </div>
  );
};

export default EstimateChart;
