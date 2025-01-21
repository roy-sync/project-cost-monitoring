"use client";
import { useEffect, useState } from "react";
import { List } from "../list";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setOnTimeProjects } from "@/redux/features/drawer-slice";
import axiosInstance from "@/axios/axiosInstance";
import { RootState } from "@/redux/store";

export const OnTimeTabContent = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const selector = (state: RootState) => state.drawer.onTimeProjects;
  const onTimeProjects = useAppSelector(selector);

  useEffect(() => {
    const controller = new AbortController();
    const retrieveData = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get(`/projects/ontime`);
        const { data } = response.data;

        if (data) {
          dispatch(setOnTimeProjects(data));
          setIsLoading(false);
        }
      } catch (err) {
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
        <div className='mx-auto h-screen w-full rounded-b-xl text-center shadow'>
          {onTimeProjects.length > 0 ? (
            onTimeProjects.map((proj) => {
              return <List id={proj.id} key={proj.id} content={proj.title} />;
            })
          ) : (
            <p className='p-5'>No Project to show.</p>
          )}
        </div>
      )}
    </>
  );
};
