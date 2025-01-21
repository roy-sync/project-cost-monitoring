"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/table/checkbox";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../table/button";
import { Tasks } from "@/models/task";

export const TaskColumns: ColumnDef<Tasks>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Task Name
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: "created_by",
    header: "Created by",
  },
  {
    accessorKey: "assigned_to",
    header: "Responsible",
  },
  {
    accessorKey: "estimate",
    header: "Estimated",
  },
  {
    accessorKey: "elapsed",
    header: "Actual",
  },
  {
    accessorKey: "tag",
    header: "Tag",
  },
];
