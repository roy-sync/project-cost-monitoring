"use client";
type GaugeProp = {
  positive: number;
  negative: number;
};
export const Gauge = ({ positive, negative }: GaugeProp) => {
  const totalPercentage = positive + negative;
  const positivePercentage = (positive / totalPercentage) * 100;
  const negativePercentage = (negative / totalPercentage) * 100;

  return (
    <div className='flex w-1/2 items-center'>
      <div
        className='w-1/8 h-3 rounded-l bg-green-500'
        style={{ width: `${positivePercentage}%` }}
      ></div>
      <div
        className='h-3 flex-grow rounded-r bg-red-500'
        style={{ width: `${negativePercentage}%` }}
      ></div>
    </div>
  );
};
