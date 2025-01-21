"use client";
import React, { useEffect, useState } from "react";
import {
  ColumnDef,
  flexRender,
  SortingState,
  getSortedRowModel,
  getCoreRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
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
import { ProjectSearchContainer } from "../projects/projects-header";
import TaskListCard from "../project-details/tasklist-header";
import { Button } from "./button";
import SkeletonLoader from "../loader/skeleton-loader";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { getParsedLocalStorageItem } from "@/lib/utils";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  projectId?: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  projectId,
}: DataTableProps<TData, TValue>) {
  const userInfo:any = getParsedLocalStorageItem('user');
  const path = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [data]);

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  // row
  const handleProjectSearchChange = (value: string) => {
    table.getColumn("title")?.setFilterValue(value);
  };

  const handleTaskSearchChange = (value: string) => {
    table.getColumn("title")?.setFilterValue(value);
  };

  const handleRowClick = (e: any, rowData: any) => {
    // oddly e.target.type for the checkbox
    if (e.target.type !== "button") {
      router.push(`projects/${rowData.id}`);
    }
  };

  return (
    <>
      {/* search */}
      {path === "/projects" ? (
        <ProjectSearchContainer
          table={table}
          handleSearchChange={handleProjectSearchChange}
        />
      ) : (
        <TaskListCard
          table={table}
          handleSearchChange={handleTaskSearchChange}
          projectId={projectId ? projectId : 0}
        />
      )}

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
            {data.length != 0 && userInfo.ID ? (
              table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    onClick={
                      path === "/projects"
                        ? (e) => handleRowClick(e, row.original)
                        : () => { }
                    }
                    className='hover:cursor-pointer hover:bg-gray-100'
                  >
                    {row.getVisibleCells().map((cell) => {
                      const cellContent = flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      );

                      // Customize cell rendering based on column ID
                      if (cell.column.id === "closed") {
                        // Add custom styling for the 'columnName' column
                        return (
                          <TableCell key={cell.id}>
                            {cell.getValue() == "N" ? (
                              <p className='rounded-full bg-green-50 py-1 pl-2 font-semibold text-green-700'>
                                {cellContent}
                              </p>
                            ) : (
                              <p className='rounded-full bg-red-50 py-1 pl-2 font-semibold text-red-500'>
                                {cellContent}
                              </p>
                            )}
                          </TableCell>
                        );
                      }
                      // cv
                      if (cell.column.id === "cv") {
                        // Add custom styling for the 'columnName' column
                        return (
                          <TableCell key={cell.id}>
                            {cell.getValue() ? (
                              <p className=' py-1 pl-2 font-semibold text-red-500'>
                                {cellContent}
                              </p>
                            ) : (
                              <p className='py-1 pl-2 font-semibold text-neutral-700'>
                                {cellContent}
                              </p>
                            )}
                          </TableCell>
                        );
                      }

                      // cpi and spi
                      if (
                        cell.column.id === "spi" ||
                        cell.column.id === "cpi"
                      ) {
                        // Add custom styling for the 'columnName' column
                        return (
                          <TableCell key={cell.id}>
                            {cell.getValue() ? (
                              <p className=' py-1 pl-2 font-semibold text-red-500'>
                                {cellContent}
                              </p>
                            ) : (
                              <p className='py-1 pl-2 font-semibold text-neutral-700'>
                                {cellContent}
                              </p>
                            )}
                          </TableCell>
                        );
                      }

                      // Default rendering for other columns
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
        <p className='font-xs ml-5 py-3 pl-5 text-neutral-500'>
          Selected: {table.getFilteredSelectedRowModel().rows.length}/{" "}
          {table.getFilteredRowModel().rows.length}
        </p>
        <div className='align-center flex'>
          <p className='font-xs ml-5 py-3 pl-5 text-neutral-500'>
            {`${table.getState().pagination.pageIndex *
              table.getState().pagination.pageSize +
              1
              }/${table.getState().pagination.pageIndex *
              table.getState().pagination.pageSize +
              10
              } of ${table.getPageCount() * table.getState().pagination.pageSize
              }`}
          </p>
          <div className='mt-1'>
            <Button
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.setPageIndex(0)}
            >
              <MdKeyboardDoubleArrowLeft size={20} />
            </Button>
            <Button
              size='sm'
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <MdKeyboardArrowLeft size={20} />
            </Button>
            <Button
              size='sm'
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <MdKeyboardArrowRight size={20} />
            </Button>
            <Button
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <MdKeyboardDoubleArrowRight size={20} />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
