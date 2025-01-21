"use client";
import EmployeeTable from "@/components/employees/employee-table";
import { useEffect, useState } from "react";
import axiosInstance from "@/axios/axiosInstance";
import { initEmp } from "@/redux/features/employee-slice";
import { useSelector, useDispatch } from "react-redux";

interface ApiParams {
  tags?: string[];
  emp_id?: number;
  project_id?: number;
  start_date?: string;
  current_date?: number;
  prev_date?: number;
  end_date?: string;
}

async function fetchData(apiEndpoint: string, params: ApiParams = {}) {
  try {
    const response = await axiosInstance.get(apiEndpoint, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
}
const EmployeeContainer = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    fetchData("/employees")
      .then((data) => {
        dispatch(initEmp({ data: data.data }));
      })
      .catch((error) => {
        console.error("Error fetching data from API 1:", error);
      });
  }, []);
  return (
    <>
      <EmployeeTable />
    </>
  );
};

export default EmployeeContainer;
