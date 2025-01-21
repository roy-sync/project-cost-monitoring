"use client";
import { ProjectTimelineChart } from "@/components/dashboard/content/charts/inactive/project-timeline-chart";
import { LegendSection } from "@/components/legend";
import { IncomeLossChart } from "../../charts/active/income-loss-chart";

type IncomeLostCardProp = {
  income: number;
  loss: number;
};

export const IncomeLostCard = ({ income, loss }: IncomeLostCardProp) => {
  return (
    <div className='mx-2 my-3 rounded-xl border p-5 shadow-md'>
      <div className='grid grid-flow-row grid-cols-1  gap-4'>
        <h5 className='text-1xl mt-2 text-center font-semibold text-neutral-700'>
          Income/Loss
        </h5>
        <LegendSection
          label1='Income'
          label2='Loss'
          color1='green'
          color2='red'
        />
        {/* chart */}
        <IncomeLossChart income={income} loss={loss} />
        {/* <ProjectTimelineChart /> */}
      </div>
    </div>
  );
};
