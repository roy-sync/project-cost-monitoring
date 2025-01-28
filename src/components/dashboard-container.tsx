"use client";
import { MainProjectCard } from "@/components/dashboard/header/cards/project-card";
import { ClosedProjectCard } from "@/components/dashboard/header/cards/closed-card";
import { WarningProjectCard } from "@/components/dashboard/header/cards/warning-card";
import { ToExpireProjectCard } from "@/components/dashboard/header/cards/expire-card";
import { SuccessProjectCard } from "@/components/dashboard/header/cards/success-card";
import { ProjectTimelineCard } from "@/components/dashboard/content/cards/inactive/project-timeline";
import { ProjectProjectionCard } from "@/components/dashboard/content/cards/inactive/project-projection";
import { CostRecoveryCard } from "@/components/dashboard/content/cards/inactive/cost-recovery";
import { ProjectPerformanceIndexCard } from "@/components/dashboard/content/cards/active/project-performance-index";
import { AnnualPerformanceCard } from "@/components/dashboard/content/cards/active/annual-performance";
import { IncomeLostCard } from "@/components/dashboard/content/cards/active/income-loss";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { Drawer } from "./header/drawer";
import axios from "axios";
import { Projects } from "@/models/projects";
import { Dashboard } from "@/models/dashboard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  setInactiveDashboardData,
  setActiveDashboardData,
} from "@/redux/features/dashboard-slice";
import { MainLoader } from "./loader/main-loader";
import axiosInstance from "@/axios/axiosInstance";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type ProjectProps = {
  data: Projects[];
};

export default function DashboardContainer() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const inactiveDashboardDataSelector = (state: RootState) =>
    state.dashboard.inactiveDashboardData;

  const activeDashboardDataSelector = (state: RootState) =>
    state.dashboard.activeDashboardData;

  const activeDashboardData = useSelector(activeDashboardDataSelector);
  const inactiveDashboardData = useSelector(inactiveDashboardDataSelector);

  const [projects, setProject] = useState<ProjectProps>({ data: [] });

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [
          projectsResponse,
          activeDashboardResponse,
          inactiveDashboardResponse,
        ] = await Promise.all([
          axiosInstance.get("/projects"),
          axiosInstance.get("/dashboard/active"),
          axiosInstance.get("/dashboard/inactive"),
        ]);

        setProject(projectsResponse.data);
        dispatch(setActiveDashboardData(activeDashboardResponse.data.data));
        dispatch(setInactiveDashboardData(inactiveDashboardResponse.data.data));
        setIsLoading(false);
      } catch (err: any) {
        throw new Error(err.message);
      }
    };
    fetchData();

    return () => {
      //cancels request on unmount
      controller.abort();
    };
  }, [dispatch]);
  const selector = (state: RootState) => state.dashboard.showActiveProjects;
  const isActive = useAppSelector(selector);

  const selectorDrawer = (state: RootState) => state.header.isDrawerOpen;
  const setDrawerOpen = useAppSelector(selectorDrawer);

  const gridClass = isActive
    ? "grid h-full grid-cols-7 duration-300 animate-fade-in"
    : "grid h-full grid-cols-3 duration-300 animate-fade-in";

  console.log(`projects: ${projects}`);
  return (
    <>
      {isLoading ? (
        <MainLoader />
      ) : (
        <div>
          <div className="grid grid-cols-5 gap-1 px-4">
            {/* <ProjectTimelineChart /> */}
            <Drawer isOpen={setDrawerOpen} />
            {/* <MainProjectCard total={projects.data.length} /> */}
            <div>
              <div className="mt-3 h-3 w-full rounded-l bg-red-500"></div>

              <ClosedProjectCard
                subtext="Projects Delayed"
                total={activeDashboardData.timeline.delayed}
              />
            </div>
            <div>
              <div className="mt-3 h-3 w-full bg-yellow-500"></div>
              <WarningProjectCard
                subtext="Projects on Warning Status"
                total={activeDashboardData.timeline.warning}
              />
            </div>
            <div>
              <div className="mt-3 h-3 w-full bg-blue-500"></div>
              <ToExpireProjectCard
                subtext="Projects To Close in 30 days"
                total={activeDashboardData.timeline.almost}
              />
            </div>
            <div>
              <div className="mt-3 h-3 w-full rounded-r bg-green-500"></div>
              <SuccessProjectCard
                subtext="Projects on Time"
                total={activeDashboardData.timeline.onTime}
              />
            </div>
          </div>
          <div className={gridClass}>
            <div className={isActive ? `col-span-2` : ""}>
              <ProjectTimelineCard
                onSchedule={
                  isActive
                    ? activeDashboardData.timeline.onTime
                    : inactiveDashboardData.timeline.onTime
                }
                delayed={
                  isActive
                    ? activeDashboardData.timeline.delayed
                    : inactiveDashboardData.timeline.delayed
                }
                onHold={
                  isActive
                    ? activeDashboardData.timeline_v2.onhold
                    : inactiveDashboardData.timeline_v2.onhold
                }
                cancelled={
                  isActive
                    ? activeDashboardData.timeline_v2.cancel
                    : inactiveDashboardData.timeline_v2.cancel
                }
              />
            </div>

            {/* hide this when isActive is false */}
            {isActive ? (
              <div className="col-span-3">
                <div className="grid grid-cols-2">
                  <ProjectPerformanceIndexCard
                    spiNegative={activeDashboardData.spi_count.negative}
                    spiPositive={activeDashboardData.spi_count.positive}
                    cpiNegative={activeDashboardData.cpi_count.negative}
                    cpiPositive={activeDashboardData.cpi_count.positive}
                  />
                  <AnnualPerformanceCard
                    successCurr={activeDashboardData.annual_current.success}
                    successPrev={activeDashboardData.annual_prev.success}
                    failedCurr={activeDashboardData.annual_current.failed}
                    failedPrev={activeDashboardData.annual_prev.failed}
                  />
                  <IncomeLostCard
                    income={activeDashboardData.profit.income}
                    loss={activeDashboardData.profit.loss}
                  />
                </div>
              </div>
            ) : (
              <ProjectProjectionCard
                loss={
                  isActive
                    ? activeDashboardData.financial_status.loss
                    : inactiveDashboardData.financial_status.loss
                }
                income={
                  isActive
                    ? activeDashboardData.financial_status.income
                    : inactiveDashboardData.financial_status.income
                }
                onHold={
                  isActive
                    ? activeDashboardData.financial_status.onhold
                    : inactiveDashboardData.financial_status.onhold
                }
                fullPayment={
                  isActive
                    ? activeDashboardData.financial_status.full
                    : inactiveDashboardData.financial_status.full
                }
                halfPayment={
                  isActive
                    ? activeDashboardData.financial_status.partial25
                    : inactiveDashboardData.financial_status.partial25
                }
                quarterPayment={
                  isActive
                    ? activeDashboardData.financial_status.partial50
                    : inactiveDashboardData.financial_status.partial50
                }
              />
            )}
            <div className={isActive ? `col-span-2` : ""}>
              <CostRecoveryCard
                fullRecovery={
                  isActive
                    ? activeDashboardData.cost_recovery.full
                    : inactiveDashboardData.cost_recovery.full
                }
                partialRecovery={
                  isActive
                    ? activeDashboardData.cost_recovery.partial
                    : inactiveDashboardData.cost_recovery.partial
                }
                potentialLost={
                  isActive
                    ? activeDashboardData.cost_recovery.potential
                    : inactiveDashboardData.cost_recovery.potential
                }
                subsidized={
                  isActive
                    ? activeDashboardData.cost_recovery.subsidized
                    : inactiveDashboardData.cost_recovery.subsidized
                }
              />
            </div>
            <div className="col-span-1">{/* <ProjectTimelineChart /> */}</div>
          </div>
        </div>
      )}
    </>
  );
}
