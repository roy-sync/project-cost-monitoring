"use client";

import { useState } from 'react';
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Button } from '@mui/material';
import dayjs, { Dayjs } from "dayjs";

interface DateRangeProps {
  startDate: string;
  endDate: string;
  onChange: (type: string, value: string) => void;
  label: string;
  disable: boolean;
}

export const DateRange: React.FC<DateRangeProps> = ({
  startDate,
  endDate,
  onChange,
  label,
  disable
}) => {
  const { firstDay, lastDay } = getFirstAndLastDayOfCurrentMonth();
  
  // State to store selected start and end dates
  var startDateConvert = startDate == "" ? dayjs(firstDay) : dayjs(startDate);
  // State to store selected start and end dates
  var endDateConvert = endDate == "" ? dayjs(lastDay) : dayjs(endDate);
  
  function getFirstAndLastDayOfCurrentMonth(): {
    firstDay: Date;
    lastDay: Date;
  } {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Get the first day of the current month
    const firstDay = new Date(year, month, 1);

    // Get the last day of the current month
    const lastDay = new Date(year, month + 1, 0);

    return { firstDay, lastDay };
  }


  return (
    <div className="mt-3 flex items-center gap-1">
      {label && <p className="whitespace-nowrap text-sm">{label}</p>}
      
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Date Start"
          sx={{
            "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input": {
              padding: "16.5px 5px",
            },
          }}
          value={startDateConvert}
          maxDate={endDateConvert}
          disabled={disable}
          onChange={(e) => {
            const startDate = e == null ? null : e.toDate();
            if (startDate) {
              const month = String(startDate.getMonth() + 1).padStart(2, "0");
              const day = String(startDate.getDate()).padStart(2, "0");
              const year = startDate.getFullYear();
              const formatedStartDate = `${year}-${month}-${day}`;
              onChange("start_date", formatedStartDate);
            }
          }}
        />
      </LocalizationProvider>
      
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Date End"
          sx={{
            "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input": {
              padding: "16.5px 5px",
            },
          }}
          value={endDateConvert}
          minDate={startDateConvert}
          disabled={disable}
          onChange={(e) => {
            const endDate = e == null ? null : e.toDate();
            if (endDate) {
              const month = String(endDate.getMonth() + 1).padStart(2, "0");
              const day = String(endDate.getDate()).padStart(2, "0");
              const year = endDate.getFullYear();
              const formatedEndDate = `${year}-${month}-${day}`;
              onChange("end_date", formatedEndDate);
            }
          }}
        />
      </LocalizationProvider>
    </div>
  );
};
