"use client";

import React from "react";
import DisposableChip from "@/components/disposable-chip";
import { RootState } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { deleteAllMultiSearch } from "@/redux/features/attendance-slice";
import { Employee } from "@/models/attendance/employee";

export const EmployeeChip = () => {
  const multiSelector = (state: RootState) => state.attendance.empSearchList;

  const employees = useSelector(multiSelector);
  const dispatch = useDispatch();

  const handleRemoveAll = () => {
    dispatch(deleteAllMultiSearch());
  };


  return (
    <div className='flex justify-between'>
      <div className='flex flex-1 flex-row-reverse flex-wrap'>
        {employees.map((entry, index) => (
          <DisposableChip
            text={entry.name}
            key={entry.name}
            id={index}
          />
        ))}
      </div>
      <button className='px-4 py-2 text-left text-xs' onClick={handleRemoveAll}>
        Clear All
      </button>
    </div>
  );
};
