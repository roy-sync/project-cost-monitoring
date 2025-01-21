"use client";
import React from "react";
import Tabs from "./tabs";
import { List } from "../list";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { DelayedTabContent } from "./delayed-tab-content";
import { OnTimeTabContent } from "./ontime-tab-content";
import { RootState } from "@/redux/store";

const fetchProjects = async () => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}projects`);
  return res.json();
};

const TabContainer = () => {
  const dispatch = useAppDispatch();

  const selector = (state: RootState) => state.drawer.onTimeProjects;
  const onTimeProjects = useAppSelector(selector);

  const selectorDelay = (state: RootState) => state.drawer.delayedProjects;
  const delayedProjects = useAppSelector(selectorDelay);

  const onTime = <OnTimeTabContent />;
  const delayed = <DelayedTabContent />;
  const tabs = [
    {
      title: "Projects on Time",
      content: onTime,
    },
    {
      title: "Projects Delayed",
      content: delayed,
    },
  ];
  return (
    <div className="mt-5">
      <Tabs defaultIndex={0} tabs={tabs} />
    </div>
  );
};

export default TabContainer;
