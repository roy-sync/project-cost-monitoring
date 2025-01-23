"use state";
import React from "react";
import Image from "next/image";
import { MainSwitch } from "./switch";
import { toggleActiveProjects } from "@/redux/features/dashboard-slice";
import { toggleDrawerState } from "@/redux/features/header-slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { usePathname, useRouter } from "next/navigation";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import DropdownMenu from "./dropdown";
import { signOut, useSession } from "next-auth/react";
import { RootState } from "@/redux/store";
import axios from "axios";

export const Header = () => {
  const dispatch = useAppDispatch();
  const path = usePathname();
  const router = useRouter();

  const selector = (state: RootState) => state.dashboard.showActiveProjects;
  const showActiveProjects = useAppSelector(selector);
  const switchToggleHandler = () => {
    dispatch(toggleActiveProjects());
  };
  const toggleDrawer = () => {
    dispatch(toggleDrawerState());
  };

  const dropdownReportItems = [
    { label: "Staff Attendance", path: "/attendance" },
    { label: "Productivity", path: "/productivity" },
    { label: "Yearly Report", path: "/productivity/yearly" },
  ];

  const dropdownSettingsItems = [
    { label: "Configurations Settings", path: "/" },
    { label: "Employee Settings", path: "/employees" },
    { label: "Holiday Settings", path: "/holiday" },
  ];
  const { data: session, status } = useSession();

  if (!session) {
    return <></>;
  }

  const handleLogout = async () => {
    const response = await axios.get('/api/index/auth/logout');
    window.location.href = '/'; // Redirect user to the home page or login page
  };

  // if (session) {
    return (
      <div className='flex-grow'>
        <nav className='border-b  bg-white'>
          <div className='ml-5 flex items-center p-4'>
            <button className='mr-2' onClick={() => router.push("/")}>
              <Image
                src='/images/logo.svg'
                width={25}
                height={25}
                alt='Picture of the author'
              />
            </button>
            <h1 className='ml-3 flex-grow text-xl font-bold text-black'>
              Project Cost Monitoring
            </h1>

            {path === "/" ? (
              <div className='flex justify-between'>
                <MainSwitch
                  inactiveLabel='Active'
                  activeLabel='Inactive'
                  switchState={showActiveProjects}
                  toggleHandler={switchToggleHandler}
                />

                <button
                  onClick={() => router.push("/projects")}
                  className='ml-2 flex items-center rounded-full bg-blue-500 px-4 py-2  text-white transition-colors hover:bg-blue-600'
                >
                  <span className='ml-3 text-sm'>View Project List</span>
                  <MdKeyboardArrowRight size={20} />
                </button>

                <DropdownMenu title='Report' items={dropdownReportItems} />
                <DropdownMenu title='Settings' items={dropdownSettingsItems} />
              </div>
            ) : path.startsWith("/projects/") ? (
              <>
                <button
                  onClick={() => router.push("/")}
                  className='flex rounded-full   bg-blue-500 px-4 py-2 text-white  transition-colors hover:bg-blue-600'
                >
                  <MdKeyboardArrowLeft size={20} />

                  <span className='ml-3 text-sm'>Dashboard</span>
                </button>
                <button
                  onClick={() => router.push("/projects")}
                  className='mx-4 flex rounded-full   bg-blue-500 px-5 py-2 text-white  transition-colors hover:bg-blue-600'
                >
                  <MdKeyboardArrowLeft size={20} />
                  <span className='ml-3 text-sm'>Projects</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => router.push("/")}
                  className='flex rounded-full   bg-blue-500 px-4 py-3 text-white'
                >
                  <MdKeyboardArrowLeft size={20} />

                  <span className='ml-3 text-sm'>Dashboard</span>
                </button>

                <DropdownMenu title='Reports' items={dropdownReportItems} />
                <DropdownMenu title='Settings' items={dropdownSettingsItems} />
              </>
            )}
            <button
              className='mx-3 rounded-full bg-red-500 px-5 py-2 text-white'
              // onClick={() => signOut()}
              onClick={ ()=> handleLogout()}>
              Sign out
            </button>
          </div>
        </nav>
      </div>
    );
  // } else {
  //   return <></>;
  // }
};
