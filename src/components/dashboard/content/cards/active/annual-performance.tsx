import { MainSwitch } from "@/components/switch";
import { LegendSection } from "@/components/legend";
import { AnnualPerformanceBarChart } from "../../charts/active/annual-performance/bar-chart";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleAnnualPerformanceChart } from "@/redux/features/dashboard-slice";
import { AnnualPerformancePieChart } from "../../charts/active/annual-performance/pie-chart";
import { RootState } from "@/redux/store";

type AnnualPerformanceCardProps = {
  successCurr: number;
  successPrev: number;
  failedCurr: number;
  failedPrev: number;
};

export const AnnualPerformanceCard = ({
  successCurr,
  successPrev,
  failedCurr,
  failedPrev,
}: AnnualPerformanceCardProps) => {
  const dispatch = useAppDispatch();
  const selector = (state: RootState) => state.dashboard.annualPerformanceShowBarChart

  const showBarChart = useAppSelector(selector);
  const switchToggleHandler = () => {
    dispatch(toggleAnnualPerformanceChart());
  };

  return (
    <div className='mx-2 my-3 rounded-xl border p-5 shadow-md'>
      <div className='grid grid-flow-row grid-cols-1  gap-4'>
        <h5 className='text-1xl mt-2 text-center font-semibold text-neutral-700'>
          Annual Performance
        </h5>
        <LegendSection
          label1='Success'
          label2='Failed'
          color1='yellow'
          color2='red'
        />
        {showBarChart ? (
          <AnnualPerformanceBarChart
            successCurr={successCurr}
            successPrev={successPrev}
            failedCurr={failedCurr}
            failedPrev={failedPrev}
          />
        ) : (
          <AnnualPerformancePieChart
            current={successCurr}
            previous={failedCurr}
          />
        )}
        <MainSwitch
          inactiveLabel='Bar'
          activeLabel='Pie'
          switchState={showBarChart}
          toggleHandler={switchToggleHandler}
        />
      </div>
    </div>
  );
};
