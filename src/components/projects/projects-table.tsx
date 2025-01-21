"use client";
import { useEffect, useState } from "react";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import { Projects } from "@/models/projects";
import axiosInstance from '@/axios/axiosInstance';
import { getParsedLocalStorageItem } from "@/lib/utils";

type ProjectProps = {
  data: Projects[];
};

const ProjectListTable = () => {
  const [projectData, setProjectData] = useState<Projects[]>([]);

  useEffect(() => {
    const deptInfo = getParsedLocalStorageItem('department');
    const userInfo:any = getParsedLocalStorageItem('user');
    const controller = new AbortController();
    const getData = async () => {
  try {
    // Retrieve and parse isAdmin from localStorage
    const isAdmin = JSON.parse(localStorage.getItem("isAdmin") || "false");

    // Construct params dynamically based on isAdmin
    const params = isAdmin
      ? {} // Pass no owner_id for admin users
      : { owner_id: userInfo.ID }; // Pass owner_id for non-admin users

    // Make the API call
    const res = await axiosInstance.get(`/projects`, { params });
    const { data } = res.data;

    if (data) {
      setProjectData(data);
    }
  } catch (err: any) {
    throw new Error(err.message);
  }
};


    getData();

    return () => {
      // cancel the request before component unmounts
      controller.abort();
    };
  }, []);

  return (
    <div className='p-4'>
      {projectData && <DataTable columns={columns} data={projectData} />}
    </div>
  );
};

export default ProjectListTable;
