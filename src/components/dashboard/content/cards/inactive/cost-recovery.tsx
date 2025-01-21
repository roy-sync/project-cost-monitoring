"use client";
import { CostRecoveryPieChart } from "../../charts/inactive/cost-recovery/pie-chart";
import { MainSwitch } from "@/components/switch";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleCostRecoveryChart } from "@/redux/features/dashboard-slice";
import { ListItem } from "@/components/list-item";
import { CostRecoveryBarChart } from "../../charts/inactive/cost-recovery/bar-chart";
import { RootState } from "@/redux/store";

type CostRecoveryCardProps = {
  fullRecovery: number;
  partialRecovery: number;
  potentialLost: number;
  subsidized: number;
};

export const CostRecoveryCard = ({
  fullRecovery,
  partialRecovery,
  potentialLost,
  subsidized,
}: CostRecoveryCardProps) => {
  const dispatch = useAppDispatch();

  const selector = (state: RootState) => state.dashboard.costRecoveryShowBarChart
  const showBarChart = useAppSelector(
    selector
  );

  const switchToggleHandler = () => {
    dispatch(toggleCostRecoveryChart());
  };

  return (
    <div className='m-5 rounded-xl border p-10 shadow-md'>
      <div className='grid grid-flow-row grid-cols-1  gap-4'>
        <h5 className='text-1xl mt-2 text-center font-semibold text-neutral-700'>
          Cost Recovery
        </h5>
        <MainSwitch
          inactiveLabel='Bar'
          activeLabel='Pie'
          switchState={showBarChart}
          toggleHandler={switchToggleHandler}
        />
        {/* chart */}

        {!showBarChart ? (
          <CostRecoveryPieChart
            fullCostRecovery={fullRecovery}
            partialCostRecovery={partialRecovery}
            potentialLost={potentialLost}
            subsidized={subsidized}
          />
        ) : (
          <CostRecoveryBarChart
            fullCostRecovery={fullRecovery}
            partialCostRecovery={partialRecovery}
            potentialLost={potentialLost}
            subsidized={subsidized}
          />
        )}
        <div className='mx-auto  w-full rounded-xl border border-b text-center'>
          <ListItem
            content='Full Cost Recovery (100%)'
            total={fullRecovery}
            hasBullet={true}
            bulletColor='green'
          />
          <ListItem
            content='Partial Cost Recovery (80% - 99%)'
            total={partialRecovery}
            hasBullet={true}
            bulletColor='yellow'
          />
          <ListItem
            content='Potential Lost (50% to 80%)'
            total={potentialLost}
            hasBullet={true}
            bulletColor='orange'
          />
          <ListItem
            content='Subsidized (less than 50%)'
            total={subsidized}
            hasBullet={true}
            bulletColor='red'
          />
        </div>
      </div>
    </div>
  );
};
