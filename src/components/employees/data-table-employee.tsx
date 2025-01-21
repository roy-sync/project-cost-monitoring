"use client";
import React, { useEffect, useState } from "react";
import {
  ColumnDef,
  flexRender,
  SortingState,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table/table";
import { Button } from "@/components/table/button";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useDispatch } from "react-redux";
import SkeletonLoader from "@/components/loader/skeleton-loader";
import { usePathname, useRouter } from "next/navigation";
import { addDataToGraphByBatch } from "@/redux/features/attendance-slice";
import { Employee } from "@/models/employee/employee";
import { ArrowUpDown } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTableEmployee<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const path = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filterInput, setFilterInput] = useState("");
  const [filterType, setFilterType] = useState("full_name");
  const [filteredData, setFilteredData] = useState(data);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(false);
  }, [data]);

  useEffect(() => {
    const filtered = data.filter((item: any) => {
      if (filterType && filterInput) {
        return item[filterType]
          ?.toString()
          .toLowerCase()
          .includes(filterInput.toLowerCase());
      }
      return true;
    });
    setFilteredData(filtered);
  }, [filterInput, filterType, data]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleRowClick = (e: any, rowData: any) => {
    if (e.target.type !== "button") {
      router.push(`employees/${rowData.id}`);
    }
  };

  return (
    <>
      <div className='ml-4 flex mt-4 mb-4'>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border p-2 border-gray-400 mr-2"
        >
          <option value="full_name">Name</option>
          <option value="work_position">Position</option>
          <option value="department">Department</option>
        </select>
        <input
          type="text"
          value={filterInput}
          onChange={(e) => setFilterInput(e.target.value)}
          placeholder="Filter"
          className="border p-2 mr-2 border-gray-400"
        />
      </div>
      <div className='rounded-t-xl border'>
        <Table>
          <TableHeader className='bg-gray-200 text-neutral-500'>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className='data-table-header cursor-pointer'
                    onClick={() => header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder ? null : (
                      <>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: "",
                          desc: "",
                        }[header.column.getIsSorted() as string] ?? null}
                      </>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {!loading ? (
              table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className='hover:cursor-pointer hover:bg-gray-100'
                    onClick={
                      path === "/employees"
                        ? (e) => handleRowClick(e, row.original)
                        : () => {}
                    }
                  >
                    {row.getVisibleCells().map((cell) => {
                      const cellContent = flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      );

                      return (
                        <TableCell
                          key={cell.id}
                          className='font-semibold text-neutral-700'
                        >
                          {cellContent}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className='h-24 text-center'>
                    No results.
                  </TableCell>
                </TableRow>
              )
            ) : (
              Array.from({ length: 5 }, (_, rowIndex) => (
                <TableRow key={rowIndex}>
                  {Array.from({ length: columns.length }, (_, cellIndex) => (
                    <TableCell key={cellIndex} className='h-24 text-center'>
                      <SkeletonLoader loading={true} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className='mb-5 flex items-center justify-between space-x-2 rounded-b-md bg-gray-200 py-1'>
        <p className='font-xs ml-5 py-3 pl-5 text-neutral-500'></p>
        <div className='align-center flex'>
          <p className='font-xs ml-5 py-3 pl-5 text-neutral-500'>
            {`${table.getState().pagination.pageIndex *
              table.getState().pagination.pageSize +
              1} - ${table.getState().pagination.pageIndex *
              table.getState().pagination.pageSize +
              10} of ${table.getPageCount() *
              table.getState().pagination.pageSize}`}
          </p>
          <div className='mt-1'>
            <Button
              size='sm'
              onClick={() => {
                const count = table.getState().pagination.pageIndex * 10 + 10;
                dispatch(
                  addDataToGraphByBatch({ start: count - 20, end: count - 10 })
                );
                table.previousPage();
              }}
              disabled={!table.getCanPreviousPage()}
              variant={"ghost"}
            >
              <MdKeyboardArrowLeft size={20} />
            </Button>
            <Button
              size='sm'
              onClick={() => {
                const count = table.getState().pagination.pageIndex * 10 + 10;
                dispatch(
                  addDataToGraphByBatch({ start: count, end: count + 10 })
                );
                table.nextPage();
              }}
              disabled={!table.getCanNextPage()}
              variant={"ghost"}
            >
              <MdKeyboardArrowRight size={20} />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

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
