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

const CardIncomeProductivityTableHours: React.FC<CardProps> = ({ title, dataIncome, dataEfficency }) => {
  const totalHoursCheck = dataIncome.totalMonth !== undefined ? dataIncome.totalMonth : 0;
  const percentageEfficiency = !dataEfficency["totalEfficencyPercent"]
  ? 0
  : dataEfficency["totalEfficencyPercent"];
  const roundedPercentageIncome = Number(dataIncome.totalEstimate.toFixed(2));
  const roundedPercentageEfficiency = Number(percentageEfficiency.toFixed(2));

  const totalBillableHours = dataIncome["totalDedicated"] !== undefined ? dataIncome["totalSpent"] - dataIncome["totalDedicated"] : dataIncome["totalSpent"]; 

  const tableData: TableProps[] = [
    {
      column1: "Actual Project (Billable) Hours",
      column2: Number(totalBillableHours).toFixed(2),
      information: "Total billable hours of employee",
    },
    {
      column1: "Dedicated Hours",
      column2: Number(dataIncome["totalDedicated"]).toFixed(2),
      information: "Total dedicated hours of employee",
    },
    {
      column1: "Paid Leaves",
      column2: Number(dataIncome["leave"]).toString(),
      information: "Paid Leave Taken by employee",
    },
    {
      column1: "Holidays",
      column2: Number(dataIncome["holiday"]).toString(),
      information: "Company Holidays",
    },
    {
      column1: "Actual Hours for the Month",
      column2: Number(totalHoursCheck).toFixed(2),
      information: "Total hours in a month - Total Paid leave - Total Holidays",
    },
  ];


  return (
    <div className='h-full overflow-hidden w-full'>
      <div className="mb-3">
        <TableIncomeData data={tableData} />
      </div>
    </div>
  );
};

export default CardIncomeProductivityTableHours;
