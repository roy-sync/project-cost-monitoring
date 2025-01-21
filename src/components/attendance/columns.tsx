"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Employee } from "@/models/attendance/employee";
import moment from 'moment';
import { Checkbox } from "@/components/table/checkbox";
import ActionButton from "../ActionButton";

// Define the handleClick function
const handleClick = (row: any) => {
    console.log("Row values:", row.original);
};

export const columns: ColumnDef<Employee>[] = [
    {
        accessorKey: "id",
        header: "No.",
    },
    {
        accessorKey: "fullname",
        header: "Responsible person"
    },
    {
        accessorKey: "date",
        header: "Date"
    },
    {
        accessorKey: "timespentformatted",
        header: "Time spent",
        id: "timespent"
    },
    {
        accessorKey: "attendanceformatted",
        header: "Attendance",
        id: "attendance"
    },
    {
        accessorKey: "editButton",
        header: "Action",
        id: "action",
        cell: ({ row }) => (
            <ActionButton onClick={() => handleClick(row)} initialValue={row.original.attendanceformatted} attendanceIdOutside={row.original.attendanceId} />
          )
    }

];
