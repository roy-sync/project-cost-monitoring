"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/table/checkbox";
import { Projects } from "@/models/projects";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "./button";

const division = (() => {
  if (typeof window !== "undefined") {
    const storedDepartment = localStorage.getItem("department");
    if (storedDepartment) {
      const { division } = JSON.parse(storedDepartment);
      return division;
    }
  }
  return null;
})();

const shouldShowSpi = division !== "Design and Development";

export const columns: ColumnDef<Projects>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
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
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Project Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "cpi",
    header: "CPI",
  },
  ...(shouldShowSpi
    ? [
        {
          accessorKey: "spi",
          header: "SPI",
        },
      ]
    : []),
  {
    accessorKey: "date_start",
    header: "Start Date",
  },
  {
    accessorKey: "initial_date_closed",
    header: "End Date",
  },
  {
    accessorKey: "closed",
    header: "Status",
    cell: ({ row }) => {
      if (row.original.closed === "N") {
        return "Active";
      }
      return "Inactive";
    },
  },
  {
    accessorKey: "cost",
    header: "Project cost",
    cell: ({ cell }) => {
      const cost = cell.getValue<number>();
      return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cost);
    },
  },
  {
    accessorKey: "actual_cost",
    header: "Actual cost",
    cell: ({ cell }) => {
      const cost = cell.getValue<number>();
      return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cost);
    },
  },
  {
    accessorKey: "total_estimate",
    header: "Allocated Time",
  },
  {
    accessorKey: "total_actual",
    header: "Time Spent",
  },
  {
    accessorKey: "cv",
    header: "CV",
  },
];
