import { TableData } from "@/models/productivity/totaltable";
import React, { useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import TableIncomeData from "./table-income-card";

interface CardProps {
  title: string;
  dataIncome: TableData;
  dataEfficency: TableData
}

interface TableProps {
  column1: string;
  column2: string;
  information: string;
}

const CardIncomeProductivityGraph: React.FC<CardProps> = ({ title, dataIncome, dataEfficency }) => {
  const percentageEfficiency = !dataEfficency["totalEfficencyPercent"]
  ? 0
  : dataEfficency["totalEfficencyPercent"];
  const roundedPercentageIncome = Number(dataIncome.totalEstimate.toFixed(2));
  const roundedPercentageEfficiency = Number(percentageEfficiency.toFixed(2));

  return (
    <div className='h-full overflow-hidden rounded shadow-lg w-4/5'>
      <div className='px-6 py-4 flex justify-evenly'>
        <div>
          <CircularProgressbar
              value={roundedPercentageIncome}
              text={`${roundedPercentageIncome}%`}
              styles={buildStyles({
                pathTransitionDuration: 0.8,
                pathColor: `rgba(39, 245, 148, ${Number(roundedPercentageIncome) / 100})`,
                trailColor: "#d6d6d6",
              })}
              className='mb-8 h-48 w-min'
          />
          <div className='mt-2 text-center'>Income Productivity</div>
        </div>
        <div>
          <CircularProgressbar
            value={roundedPercentageEfficiency}
            text={`${roundedPercentageEfficiency}%`}
            styles={buildStyles({
              pathTransitionDuration: 0.8,
              pathColor: `rgba(39, 243, 245, ${roundedPercentageEfficiency / 100})`,
              trailColor: "#d6d6d6",
            })}
            className='mb-8 h-48 w-min'
          />
          <div className='mt-2 text-center'>Efficiency Productivity</div>
        </div>

      </div>
    </div>
  );
};

export default CardIncomeProductivityGraph;
