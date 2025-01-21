"use client";

import { DateRange } from "../date-range";
import { SearchForm } from "../search-form";
import { EmployeeChip } from "./employee-chip";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  updateDateData,
  initialDateData,
} from "@/redux/features/attendance-slice";

export default function AttendanceSearchContainer() {
  const dispatch = useDispatch();
  const startDateSelector = (state: RootState) => state.attendance.start_date;
  const startDate = useSelector(startDateSelector);
  const endDateSelector = (state: RootState) => state.attendance.end_date;
  const endDate = useSelector(endDateSelector);

  const onChangeDate = (type: string, value: string) => {
    dispatch(updateDateData({ type: type, data: value }));
  };

  return (
    <>
      <div className='border border-gray-200 px-2 py-4 sm:rounded-lg'>
        <div className='mb-3 flex'>
          <h4 className='text-2xl font-bold'>Filter</h4>
        </div>
        <SearchForm />
        <div className='mt-3'>
          <DateRange
            startDate={startDate}
            endDate={endDate}
            onChange={onChangeDate}
            label={"Date range:"}
            disable={false}
          />
        </div>
        <div className='mt-3'>
          <EmployeeChip />
        </div>
      </div>
    </>
  );
}
