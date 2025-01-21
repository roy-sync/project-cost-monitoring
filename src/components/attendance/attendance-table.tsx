"use client";

import { RootState } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import moment from 'moment';
import { columns } from "./columns";
import { DataTableAttendance } from "./data-table-attendance";
import { Employee } from "@/models/attendance/employee";

export default function AttendanceTable() {

  const dateSelector = (state: RootState) => state.attendance.dateRangeEmployee;

  const dateEmployee = useSelector(dateSelector);

  var employees: Employee[] = [];
  if (dateEmployee.length > 0) {
    employees = dateEmployee;
  }


  return (
    <>
      <DataTableAttendance columns={columns} data={employees} />
    </>
  );
}
