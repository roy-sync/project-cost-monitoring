import { TableData } from "@/models/productivity/totaltable";
import React from "react";
interface CardProps {
  title: string;
  data: TableData;
}

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Card: React.FC<CardProps> = ({ title, data }) => {
  const percentage = !data["totalEfficencyPercent"]
    ? 0
    : data["totalEfficencyPercent"];
  const roundedPercentage = Number(percentage.toFixed(2));

  return (
    <div className='w-full overflow-hidden rounded shadow-lg'>
      <div className='px-6 py-4'>
        <CircularProgressbar
          value={roundedPercentage}
          text={`${roundedPercentage}%`}
          styles={buildStyles({
            pathTransitionDuration: 0.8,
            pathColor: `rgba(39, 243, 245, ${roundedPercentage / 100})`,
            trailColor: "#d6d6d6",
          })}
          className='mb-8 h-48 w-min'
        />
        <div className='mb-2 text-xl font-bold'>
          {title} : {roundedPercentage}%
        </div>
        <hr />
        <p className='my-4'>
          <span className='text-base  font-semibold text-gray-700'>
            Total Estimate
          </span>
          :{" "}
          <span className='text-gray-700'>
            {Number(data["totalEstimate"].toFixed(2))}
          </span>
        </p>
        <p className='my-4'>
          {" "}
          <span className='text-base  font-semibold text-gray-700'>
            {"Total Spent"}
          </span>{" "}
          :{" "}
          <span className='text-gray-700'>
            {Number(data["totalSpent"].toFixed(2))}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Card;
