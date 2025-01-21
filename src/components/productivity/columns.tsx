"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Productivity } from "@/models/productivity/productivity";

export const columns: ColumnDef<Productivity>[] = [
  {
    accessorKey: "assignedTo",
    header: "Responsible person",
  },
  {
    accessorKey: "projectName",
    header: "Project Name",
  },
  {
    accessorKey: "totalEstimate",
    header: "Estimated time required ",
    cell(props) {
      return Number(props.getValue()).toFixed(2);
    },
  },
  {
    accessorKey: "totalTimeSpent",
    header: "Time spent (reporting period)",
    cell(props) {
      return Number(props.getValue()).toFixed(2);
    },
  },
  {
    accessorKey: "tag",
    header: "Tag",
  },
  {
    accessorKey: "createdBy",
    header: "Created By",
  },
];
