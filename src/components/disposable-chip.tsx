"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteEmployeeInMultiSearch } from "@/redux/features/attendance-slice";

type DisposableChipProps = {
  text: string;
  id: number;
};

const DisposableChip = ({ text, id }: DisposableChipProps) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(deleteEmployeeInMultiSearch(text));
  };

  return (
    <div
      className={`self-center rounded-full border border-gray-300 px-4 text-xs text-gray-500 outline-none hover:border-gray-400 focus:border-gray-400`}
    >
      <span>{text}</span>
      <button className='ml-2' onClick={handleRemove}>
        &times;
      </button>
    </div>
  );
};

export default DisposableChip;
