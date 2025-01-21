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

const greenText = 'text-green-500';
const redText = 'text-red-500';

const CardIncomeProductivityTable: React.FC<CardProps> = ({ title, dataIncome, dataEfficency }) => {
 const percentageEfficiency = !dataEfficency["totalEfficencyPercent"]
  ? 0
  : dataEfficency["totalEfficencyPercent"];
  const roundedPercentageIncome = Number(dataIncome.totalEstimate.toFixed(2));
  const roundedPercentageEfficiency = Number(percentageEfficiency.toFixed(2));

  const textColorClass = roundedPercentageIncome >= 100 ? greenText : redText;


  const textColorClassEff = (dataEfficency && dataEfficency.quota !== undefined && roundedPercentageEfficiency >= dataEfficency.quota) 
    ? greenText 
    : redText;
  return (
    <div className='h-full overflow-hidden rounded w-1/2'>
      <div className="flex flex-col border border-gray-300">
        <div className="flex">
            <div className="w-full p-4 text-center font-bold">
            {title}
            </div>
        </div>
        <div className="flex">
            <div className="w-1/2 p-4 border border-gray-300 font-bold text-center">
            Income Productivity
            </div>
            <div className="w-1/2 p-4 border border-gray-300 font-bold text-center text-blue-600">
            Efficiency Productivity
            </div>
        </div>

        <div className="flex">
            <div className="w-1/4 p-4 border border-gray-300 font-bold text-center">
            Quota
            </div>
            <div className="w-1/4 p-4 border border-gray-300 font-bold text-center">
            Rating
            </div>
            <div className="w-1/4 p-4 border border-gray-300 font-bold text-center text-blue-600">
            Quota
            </div>
            <div className="w-1/4 p-4 border border-gray-300 font-bold text-center text-blue-600">
            Rating
            </div>
        </div>
        <div className="flex">
            <div className="w-1/4 p-4 border border-gray-300 text-center">
            100%
            </div>
            <div className={`w-1/4 p-4 border border-gray-300 text-center ${textColorClass}`}>
            {`${roundedPercentageIncome}%`}
            </div>
            <div className="w-1/4 p-4 border border-gray-300 text-center">
            {`${dataEfficency.quota}%`}
            </div>
            <div className={`w-1/4 p-4 border border-gray-300 text-center ${textColorClassEff}`}>
            {`${roundedPercentageEfficiency}%`}
            </div>
        </div>
      </div>
    </div>
  );
};

export default CardIncomeProductivityTable;
