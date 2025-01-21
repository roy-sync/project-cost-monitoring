"use client";
import React, { useEffect, useState } from "react";
import {
  ColumnDef,
  flexRender,
  SortingState,
  getCoreRowModel,
  ColumnFiltersState,
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
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/table/button";
import SkeletonLoader from "../loader/skeleton-loader";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { addDataToGraphByBatch } from "@/redux/features/attendance-slice";
import { useDispatch } from "react-redux";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  employeeId?: number;
}

export function DataTableAttendance<TData, TValue>({
  columns,
  data,
  employeeId,
}: DataTableProps<TData, TValue>) {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(false);
  }, [data]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <div className='rounded-t-xl border '>
        <Table>
          <TableHeader className='bg-gray-200 text-neutral-500'>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className='data-table-header text-center'
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
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
                  <TableCell
                    colSpan={columns.length}
                    className='h-24 text-center'
                  >
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
            {`${
              table.getState().pagination.pageIndex *
                table.getState().pagination.pageSize +
              1
            } - ${
              table.getState().pagination.pageIndex *
                table.getState().pagination.pageSize +
              10
            } of ${
              table.getPageCount() * table.getState().pagination.pageSize
            }`}
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
