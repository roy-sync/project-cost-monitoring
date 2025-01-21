"use client";
import { useEffect, useState } from "react";
import axiosInstance from '@/axios/axiosInstance';
import { Holiday } from "@/models/holiday";
import { DataTableHoliday } from "./holiday-data-table";
import HolidayCard from "./holiday-card";

const HolidayContainer = () => {
  const [holidayData, setHolidayData] = useState<Holiday[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    const getData = async () => {
      try {
        const res = await axiosInstance.get(`/holiday`);
        const { data } = res.data;
        if (data) {
          setHolidayData(data);
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

  const handleDelete = async (id: string) => {
    try {
      await axiosInstance.delete(`/holiday/${id}`);
  
      const res = await axiosInstance.get(`/holiday`);
      const { data } = res.data;
      if (data) {
        setHolidayData(data);
      }
    } catch (err) {
      console.error("Error deleting holiday:", err);
    }
  };

  const handleAdd = async (name: string, date: string) => {
    try {
      
      const params = {name : name, date: date};
      await axiosInstance.post(`/holiday`, params);
  
      const res = await axiosInstance.get(`/holiday`);
      const { data } = res.data;
      if (data) {
        setHolidayData(data);
      }
    } catch (err) {
      console.error("Error deleting holiday:", err);
    }
  };

  const handleUpdate = async (id: string, name: string, date: Date) => {
    const params = {name: name, date: date};
    await axiosInstance.put(`/holiday/${id}`, params);
  };


  return (
    <div className='p-4'>
      <HolidayCard onAdd={handleAdd} />
      {holidayData && <DataTableHoliday data={holidayData} onDelete={handleDelete} onUpdate={handleUpdate} />}

    </div>
  );
};

export default HolidayContainer;
