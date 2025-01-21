"use client";

import { RootState } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";

import { column } from "./column";
import { DataTableEmployee } from "./data-table-employee";
import { Employee } from "@/models/employee/employee";

export default function EmployeeTable() {
  const dateSelector = (state: RootState) => state.employee.employee;

  const dateEmployee = useSelector(dateSelector);

  var employees: Employee[] = [];
  if (dateEmployee.length > 0) {
    employees = dateEmployee;
  }

  return (
    <>
      <DataTableEmployee columns={column} data={employees} />
    </>
  );
}
