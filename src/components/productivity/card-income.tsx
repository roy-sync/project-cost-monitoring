import { TableData } from "@/models/productivity/totaltable";
import React, { useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import TableIncomeData from "./table-income-card";

interface CardProps {
  title: string;
  data: TableData;
}

interface TableProps {
  column1: string;
  column2: string;
  information: string;
}

const CardIncome: React.FC<CardProps> = ({ title, data }) => {
  const totalHoursCheck = data.totalMonth !== undefined ? data.totalMonth : 0;
  const roundedPercentage = Number(data.totalEstimate.toFixed(2));

  const tableData: TableProps[] = [
    {
      column1: "Actual Project (Billable) Hours",
      column2: Number(data["totalSpent"]).toFixed(2),
      information: "Total billable hours of employee",
    },
    {
      column1: "Dedicated Hours",
      column2: Number(data["totalDedicated"]).toFixed(2),
      information: "Total dedicated hours of employee",
    },
    {
      column1: "Paid Leaves",
      column2: Number(data["leave"]).toString(),
      information: "Paid Leave Taken by employee",
    },
    {
      column1: "Holidays",
      column2: Number(data["holiday"]).toString(),
      information: "Company Holidays",
    },
    {
      column1: "Actual Hours for the Month",
      column2: Number(totalHoursCheck).toString(),
      information: "Total hours in a month - Total Paid leave - Total Holidays",
    },
  ];

  return (
    <div className='h-full overflow-hidden rounded shadow-lg'>
      <div className='px-6 py-4'>
        <CircularProgressbar
          value={roundedPercentage}
          text={`${roundedPercentage}%`}
          styles={buildStyles({
            pathTransitionDuration: 0.8,
            pathColor: `rgba(39, 245, 148, ${Number(roundedPercentage) / 100})`,
            trailColor: "#d6d6d6",
          })}
          className='mb-8 h-48 w-min'
        />
        <div className='mb-2 text-xl font-bold'>
          {title} : {Number(roundedPercentage).toFixed(2)}%
        </div>
        <hr />

        <div>
          <TableIncomeData data={tableData} />
        </div>
      </div>
    </div>
  );
};

export default CardIncome;
