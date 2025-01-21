"use client";
import { Gauge } from "@/components/gauge";
import { LegendSection } from "@/components/legend";

type ProjectPerformanceIndexCardProps = {
  spiPositive: number;
  cpiPositive: number;
  spiNegative: number;
  cpiNegative: number;
};

export const ProjectPerformanceIndexCard = ({
  spiPositive,
  cpiPositive,
  spiNegative,
  cpiNegative,
}: ProjectPerformanceIndexCardProps) => {
  return (
    <div className='col-span-2 my-5 h-auto rounded-xl border p-5 shadow-md'>
      <h5 className='text-1xl mt-2 text-center font-semibold text-neutral-700'>
        Project Performance Index
      </h5>
      <LegendSection
        label1='Positive'
        label2='Negative'
        color1='green'
        color2='red'
      />
      <div className=''>
        <div className='align-center flex justify-between'>
          <p className='p-5 text-sm text-neutral-700'>
            Schedule Performance Index (SPI)
          </p>
          <Gauge positive={spiPositive} negative={spiNegative} />
        </div>
        <div className='align-center flex justify-between'>
          <p className='p-5 text-sm text-neutral-700'>
            Cost Performance Index (CPI)
          </p>
          <Gauge positive={cpiPositive} negative={cpiNegative} />
        </div>
      </div>
    </div>
  );
};
