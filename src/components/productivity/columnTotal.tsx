"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TableData } from "@/models/productivity/totaltable";

export const columnTotal: ColumnDef<TableData>[] = [
    {
        accessorKey: "totalEstimate",
        header: "Estimated time required (Total)"
    },
    {
        accessorKey: "totalSpent",
        header: "Time spent (reporting period) (Total)"
    },
];
