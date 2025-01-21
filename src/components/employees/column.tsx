"use client";

import { Employee } from "@/models/employee/employee";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { Button } from "../table/button";
import { ArrowUpDown } from "lucide-react";

// Define the column with custom rendering
export const column: ColumnDef<Employee>[] = [
  {
    id: "select",
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "full_name",
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Employee Name
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: "work_position",
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Work Position
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: "department",
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Department
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    }
  },
  {
    accessorKey: "leave",
    header: "Paid Leave",
  },
  {
    accessorKey: "quota",
    header: "Efficiency Quota",
  },

];
