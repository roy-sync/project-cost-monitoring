"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/table/checkbox";
import { Projects } from "@/models/projects";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/table/button";

export const tabContentColumns: ColumnDef<Projects>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Project Name
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
];
