import React from "react";

type LegendSectionProps = {
  label1: string;
  label2: string;
  color1: string;
  color2: string;
};

export const LegendSection = ({
  label1,
  label2,
  color1,
  color2,
}: LegendSectionProps) => {
  const legendColor1 = `mr-2 h-2 w-2 rounded-full bg-${color1}-500`;
  const legendColor2 = `ml-2 mr-2 h-2 w-2 rounded-full bg-${color2}-500`;
  return (
    <div className='mx-auto my-3 mb-5 flex justify-center'>
      <span className='inline-flex items-center'>
        <span className={legendColor1}></span>
        <span className='text-xs text-neutral-700'>{label1}</span>
        <span className={legendColor2}></span>
        <span className='text-xs text-neutral-700'>{label2}</span>
      </span>
    </div>
  );
};
