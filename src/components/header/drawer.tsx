"use client"
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleDrawerState } from "@/redux/features/header-slice";
import React, { useEffect, useRef } from "react";
import TabContainer from "./tabs/tab-container";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";

type DrawerProps = {
  isOpen: boolean;
};

export const Drawer = ({ isOpen }: DrawerProps) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const selector = (state: RootState) => state.header.isDrawerOpen
  const drawerState = useAppSelector(selector);
  const router = useRouter();
  const dispatch = useAppDispatch();

  // close drawer
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(e.target as Node) &&
        drawerState === true
      ) {
        dispatch(toggleDrawerState());

        // Perform other actions or execute code here
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dispatch, drawerState]);

  //navigate to different route
  const changeRoute = () => {
    dispatch(toggleDrawerState());
    router.push("/projects");
  };

  return (
    <div
      className={`fixed right-0 top-0 z-[10] h-full w-1/3 transform bg-neutral-50  shadow transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      ref={drawerRef}
    >
      <div className='flex justify-between p-5 shadow'>
        <p className='text-lg font-semibold text-neutral-900'>
          On Going Projects
        </p>
        <button
          onClick={() => changeRoute()}
          className='rounded-full border border-blue-700 bg-blue-500 px-4 py-1 text-white'
        >
          <span className='text-sm'>Projects List</span>
        </button>
      </div>
      <TabContainer />
    </div>
  );
};
