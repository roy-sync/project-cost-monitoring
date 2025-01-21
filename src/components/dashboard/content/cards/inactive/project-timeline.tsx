"use client";
import { ProjectTimelineChart } from "@/components/dashboard/content/charts/inactive/project-timeline-chart";
import { ListItem } from "@/components/list-item";

type ProjectTimelineCardProps = {
  onSchedule: number;
  delayed: number;
  onHold: number;
  cancelled: number;
};

export const ProjectTimelineCard = ({
  onSchedule,
  delayed,
  onHold,
  cancelled,
}: ProjectTimelineCardProps) => {
  return (
    <div className='m-5 rounded-xl border p-10 shadow-md'>
      <div className='grid grid-flow-row grid-cols-1  gap-4'>
        <h5 className='text-1xl mt-2 text-center font-semibold text-neutral-700'>
          Project Timeline
        </h5>
        {/* chart */}
        <ProjectTimelineChart
          onSchedule={onSchedule}
          delayed={delayed}
          onHold={onHold}
          cancelled={cancelled}
        />

        <div className='mx-auto w-full rounded-xl border border-b text-center'>
          <ListItem
            content='On Schedule'
            total={onSchedule}
            hasBullet={true}
            bulletColor='green'
          />
          <ListItem
            content='Projects Delayed'
            total={delayed}
            hasBullet={true}
            bulletColor='red'
          />
          <ListItem
            content='On Hold'
            total={onHold}
            hasBullet={true}
            bulletColor='yellow'
          />
          <ListItem
            content='Cancelled'
            total={cancelled}
            hasBullet={true}
            bulletColor='slate'
            isLastList={true}
          />
        </div>
      </div>
    </div>
  );
};
