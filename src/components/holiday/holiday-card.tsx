import React, { useState } from "react";
import Select from "react-select";
import SearchInput from "../projects/search";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import axiosInstance from "@/axios/axiosInstance";

interface DataProps {
  onAdd: (name: string, date: string) => void;
}


const HolidayCard: React.FC<DataProps> = ({ onAdd }) => {

  const dispatch = useAppDispatch();
  const [holidayName, setHolidayName] = useState("");
  const [holidayDate, setHolidayDate] = useState("");

  const handleNameChange = (e: string) => {
    setHolidayName(e);
  };

  const handleDateChange = (e:string) => {
    setHolidayDate(e);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
        try {
            onAdd(holidayName,holidayDate);

            setHolidayName("");
            setHolidayDate("");
        } catch (err: any) {
            console.log(err);
        }
    }
    
  return (
    <div className="my-5 rounded-xl border shadow">
      <div className="flex justify-between">
        <p className="text-md mt-5 px-5 font-semibold text-slate-900">
          Add Holiday
        </p>
      </div>
      <form onSubmit={handleSubmit} className="px-5 py-3">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Holiday Name
          </label>
          <input
            type="text"
            className="border rounded w-full py-2 px-3"
            placeholder="Enter holiday name"
            value={holidayName}
            onChange={(e) => {
                handleNameChange(e.target.value);
            }}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Holiday Date
          </label>
          <input
            type="date"
            className="border rounded w-full py-2 px-3"
            value={holidayDate}
            onChange={(e) => {
                handleDateChange(e.target.value);
            }}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default HolidayCard;
