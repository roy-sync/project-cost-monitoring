"use client";
import AttendanceTable from "@/components/attendance/attendance-table";
import { Timespent } from "@/components/attendance/charts/timespent";
import { LegendSection } from "@/components/legend";
import AttendanceSearchContainer from "./search-container";
import { Employee } from "@/models/attendance/employee";
import { useDispatch } from "react-redux";
import {
  addDataFromApi,
  addDataToGraphByBatch,
  initialDateData,
} from "@/redux/features/attendance-slice";
import { AttendanceAPIProps } from "@/models/attendance/api-props";
import { useEffect, useState } from "react";

import axiosInstance from "@/axios/axiosInstance";

const AttendanceContainer = () => {
  const [data, setData] = useState<AttendanceAPIProps[]>();
  const dispatch = useDispatch();

  /**
   * The above function uses the useEffect hook to fetch data from an API endpoint and update the state
   * with the response data.
   */
  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/attendance`);
        const { data } = await res.data;

        setData(data);
      } catch (err: any) {
        throw new Error(err.message);
      }
    };

    fetchData();

    return () => {
      // cancel request when unmount
      controller.abort();
    };
  }, []);

  // useEffect with empty dependency array runs only once on initial load.
  useEffect(() => {
    // Dispatch the fetchUserData action to make the API call.
    if (data) {
      data.flatMap((emp, index) => {
        const convertedDate: Employee = {
          id: index + emp.emp_id + 1,
          date: emp.date,
          name: { first: emp.first_name, last: emp.last_name },
          timespent: emp.timespent,
          attendance: emp.attendance,
          fullname: emp.first_name + " " + emp.last_name,
          timespentformatted: emp.timespentformatted,
          attendanceformatted: emp.attendanceformatted,
          leave: emp.leave,
          attendanceId: emp.attendance_id
        };

        dispatch(addDataFromApi(convertedDate));
      });

      const { firstDay, lastDay } = getFirstAndLastDayOfCurrentMonth();

      dispatch(
        initialDateData({
          first: formatDate(firstDay),
          last: formatDate(lastDay),
        })
      );
    }

    dispatch(addDataToGraphByBatch({ start: 0, end: 10 }));
  }, [dispatch, data]);

  function formatDate(dateFormat: Date): { formatDate: string } {
    const month = String(dateFormat.getMonth() + 1).padStart(2, "0");
    const day = String(dateFormat.getDate()).padStart(2, "0");
    const year = dateFormat.getFullYear();
    const formatDate = `${year}-${month}-${day}`;

    return { formatDate };
  }

  function getFirstAndLastDayOfCurrentMonth(): {
    firstDay: Date;
    lastDay: Date;
  } {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Get the first day of the current month
    console.log(month);
    console.log('-----');
    const firstDay = new Date(2024, month, 1);

    // Get the last day of the current month
    const lastDay = new Date(year, month + 1, 0);

    return { firstDay, lastDay };
  }

  return (
    <>
      <div className='px-4 pt-3'>
        <div>
          <div className='border border-gray-200 sm:rounded-lg'>
            <h4 className='text-center text-3xl font-bold'>Staff Attendance</h4>
            <LegendSection
              label1='Time Spent (In Hours)'
              label2='Attendance (In Hours)'
              color1='orange'
              color2='green'
            />
            <Timespent />
          </div>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-2 px-4 pt-3'>
        <div>
          <AttendanceSearchContainer />
        </div>
        <div className='col-span-2'>
          <AttendanceTable />
        </div>
      </div>
    </>
  );
};

export default AttendanceContainer;
