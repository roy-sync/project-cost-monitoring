import { ListItem } from "@/components/list-item";
import { ProjectProjectionChart } from "../../charts/inactive/project-projection-chart";

type ProjectProjectionCardProps = {
  loss: number;
  income: number;
  onHold: number;
  fullPayment: number;
  halfPayment: number;
  quarterPayment: number;
};

export const ProjectProjectionCard = ({
  loss,
  income,
  onHold,
  fullPayment,
  halfPayment,
  quarterPayment,
}: ProjectProjectionCardProps) => {
  return (
    <div className='m-5 rounded-xl border p-10 shadow-md'>
      <div className='grid grid-flow-row grid-cols-1  gap-4'>
        <h5 className='text-1xl mt-2 text-center font-semibold text-neutral-700'>
          Project Financial Status vs Actual Payment
        </h5>
        <ProjectProjectionChart
          loss={loss}
          income={income}
          fullPayment={0}
          partialPayment={0}
          quarterPayment={0}
        />
        <div className='mx-auto w-full rounded-xl border border-b text-center'>
          <ListItem content='Loss' hasBullet={false} total={loss} />
          <ListItem content='Income' hasBullet={false} total={income} />
          <ListItem content='On Hold' hasBullet={false} total={onHold} />
          <ListItem
            content='Full Payment (100%)'
            hasBullet={false}
            total={fullPayment}
          />
          <ListItem
            content='Partial Payment (50%)'
            hasBullet={false}
            total={halfPayment}
          />
          <ListItem
            content='Partial Payment (25%)'
            hasBullet={false}
            total={quarterPayment}
            isLastList={true}
          />
        </div>
      </div>
    </div>
  );
};
