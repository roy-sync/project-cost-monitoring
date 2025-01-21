"use client";
import { useEffect, useState } from "react";
import { List } from "../list";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setOnTimeProjects,
  setDelayedProjects,
} from "@/redux/features/drawer-slice";
import axiosInstance from "@/axios/axiosInstance";
import { RootState } from "@/redux/store";

export const DelayedTabContent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const selector = (state: RootState) => state.drawer.delayedProjects;
  const delayedProjects = useAppSelector(selector);
  useEffect(() => {
    const controller = new AbortController();
    const retrieveData = async () => {
      try {
        setIsLoading(true);

        const response = await axiosInstance.get(`/projects/delayed`);
        const { data } = await response.data;
        if (data) {
          dispatch(setDelayedProjects(data));
          setIsLoading(false);
        }
      } catch (err) {
        // throw new Error(err.message);
        console.log(err);
      }
    };
    retrieveData();

    return () => {
      controller.abort();
    };
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <div className='flex  h-screen items-center justify-center'>
          <div className='h-10 w-8 animate-spin rounded-full border-t-4 border-blue-400 p-5'></div>
        </div>
      ) : (
        <div className='mx-auto w-full rounded-b-xl text-center shadow'>
          {delayedProjects ? (
            delayedProjects.map((proj) => {
              return <List id={proj.id} key={proj.id} content={proj.title} />;
            })
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
};
