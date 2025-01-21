"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table/table";

import { Yearly } from "@/models/productivity/yearly/yearly";
import { Button } from "@/components/table/button";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useEffect } from "react";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import axiosInstance from "@/axios/axiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { initData } from "@/redux/features/yearly-slice";
import SkeletonLoader from "@/components/loader/skeleton-loader";

const loopArray = Array.from({ length: 17 });
const loopArrayVal = Array.from({ length: 65 });

const months: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
  "1st Quarter",
  "2nd Quarter",
  "3rd Quarter",
  "4th Quarter",
  "Overall",
];

interface TableData {
  current: number;
  last: number;
  total: number;
  year: number;
}

interface DataTableProps<TData, TValue> {
  data: Yearly[];
  tableData: TableData;
}

async function fetchData(apiEndpoint: string, page: number, year: number) {
  try {
    const response = await axiosInstance.get(apiEndpoint, {
      params: { page, year },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export function DataTableProductivityYearly<TData, TValue>({
  data,
  tableData,
}: DataTableProps<TData, TValue>) {
  const dispatch = useDispatch();

  const [alertMessage, setAlertMessage] = useState("Fetching Data");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data.length != 0) {
      setLoading(false);
    }
  }, [data]);

  const updateTable = (value: number) => {
    setLoading(true);

    fetchData("/yearly", value, tableData.year)
      .then((data) => {
        dispatch(initData(data));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data from API:", error);
      });
  };

  const styles = {
    position: "absolute",
    left: 0,
    width: "100px",
  };

  return (
    <>
      <Table
        style={{
          marginLeft: "300px",
        }}
      >
        <TableHeader className='bg-gray-200 text-neutral-500'>
          <TableRow key='1'>
            <TableHead
              key='10'
              className='data-table-header text-center'
              colSpan={4}
              style={{
                position: "absolute",
                left: 16,
                width: "300px",
                zIndex: 1,
                backgroundColor: "#efefef",
              }}
            ></TableHead>

            {months.map((month, index) => (
              <TableHead
                key={index}
                className='data-table-header border-l border-white bg-blue-200 text-center'
                colSpan={4}
                style={{
                  left: 16 + 300 + index * 100, // Adjust the offset as needed
                }}
              >
                {month}
              </TableHead>
            ))}
          </TableRow>
          <TableRow key='2'>
            <TableHead
              key='100'
              className='data-table-header text-center text-gray-200'
              colSpan={2}
              style={{
                position: "absolute",
                left: 16,
                width: "300px",
                zIndex: 1,
                backgroundColor: "#efefef",
              }}
            >
              &nbsp;
            </TableHead>
            <TableHead
              key='2'
              className='data-table-header text-center text-gray-200'
              colSpan={2}
              style={{
                position: "absolute",
                left: 16,
                width: "300px",
                zIndex: 1,
                backgroundColor: "#efefef",
              }}
            >
              &nbsp;
            </TableHead>

            {loopArray.map((_, index) => (
              // The loop generates 12 list items with unique keys

              <React.Fragment key={index}>
                <TableHead
                  className='data-table-header bg-purple-200 text-center'
                  colSpan={2}
                >
                  Income Productivity
                </TableHead>
                <TableHead
                  className='data-table-header bg-yellow-200 text-center'
                  colSpan={2}
                >
                  Efficiency Productivity
                </TableHead>
              </React.Fragment>
            ))}
          </TableRow>
          <TableRow key='3'>
            <TableHead
              key='31'
              className='data-table-header text-center'
              colSpan={4}
              style={{
                position: "absolute",
                left: 16,
                width: "300px",
                zIndex: 1,
                backgroundColor: "#efefef",
              }}
            >
              Employee Name
            </TableHead>

            {loopArray.map((_, index) => (
              // The loop generates 12 list items with unique keys

              <React.Fragment key={index}>
                <TableHead
                  className='data-table-header bg-teal-700 text-center'
                  colSpan={1}
                >
                  Quote
                </TableHead>
                <TableHead
                  className='data-table-header bg-gray-400 text-center'
                  colSpan={1}
                >
                  Productivity
                </TableHead>
                <TableHead
                  className='data-table-header bg-teal-700 text-center'
                  colSpan={1}
                >
                  Quote
                </TableHead>
                <TableHead
                  className='data-table-header bg-gray-400 text-center'
                  colSpan={1}
                >
                  Productivity
                </TableHead>
              </React.Fragment>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {!loading
            ? data.map((emp, index) => (
                // The loop generates 12 list items with unique keys

                <React.Fragment key={index}>
                  <TableRow className='w-1/4 hover:cursor-pointer hover:bg-gray-100'>
                    <TableCell
                      key='01'
                      className='w-1/4 font-semibold text-neutral-700'
                      colSpan={4}
                      style={{
                        position: "absolute",
                        left: 16,
                        width: "300px",
                        zIndex: 1,
                        backgroundColor: "#efefef",
                      }}
                    >
                      {emp.name}
                    </TableCell>
                    {/** january */}
                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                    >
                      {emp.january.income.quote}%
                    </TableCell>

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                      style={{
                        color:
                          emp.january.income.productivity <
                          emp.january.income.quote
                            ? "red"
                            : "green",
                      }}
                    >
                      {emp.january.income.productivity}%
                    </TableCell>

                    {/** --- */}

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                    >
                      {emp.january.efficiency.quote}%
                    </TableCell>

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                      style={{
                        color:
                          emp.january.efficiency.productivity <
                          emp.january.efficiency.quote
                            ? "red"
                            : "green",
                      }}
                    >
                      {emp.january.efficiency.productivity}%
                    </TableCell>

                    {/** febraury */}

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                    >
                      {emp.febraury.income.quote}%
                    </TableCell>

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                      style={{
                        color:
                          emp.febraury.income.productivity <
                          emp.febraury.income.quote
                            ? "red"
                            : "green",
                      }}
                    >
                      {emp.febraury.income.productivity}%
                    </TableCell>

                    {/** --- */}

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                    >
                      {emp.febraury.efficiency.quote}%
                    </TableCell>

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                      style={{
                        color:
                          emp.febraury.efficiency.productivity <
                          emp.febraury.efficiency.quote
                            ? "red"
                            : "green",
                      }}
                    >
                      {emp.febraury.efficiency.productivity}%
                    </TableCell>

                    {/** march */}

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                    >
                      {emp.march.income.quote}%
                    </TableCell>

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                      style={{
                        color:
                          emp.march.income.productivity < emp.march.income.quote
                            ? "red"
                            : "green",
                      }}
                    >
                      {emp.march.income.productivity}%
                    </TableCell>

                    {/** --- */}

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                    >
                      {emp.march.efficiency.quote}%
                    </TableCell>

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                      style={{
                        color:
                          emp.march.efficiency.productivity <
                          emp.march.efficiency.quote
                            ? "red"
                            : "green",
                      }}
                    >
                      {emp.march.efficiency.productivity}%
                    </TableCell>

                    {/** april */}

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                    >
                      {emp.april.income.quote}%
                    </TableCell>

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                      style={{
                        color:
                          emp.april.income.productivity < emp.april.income.quote
                            ? "red"
                            : "green",
                      }}
                    >
                      {emp.april.income.productivity}%
                    </TableCell>

                    {/** --- */}

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                    >
                      {emp.april.efficiency.quote}%
                    </TableCell>

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                      style={{
                        color:
                          emp.april.efficiency.productivity <
                          emp.april.efficiency.quote
                            ? "red"
                            : "green",
                      }}
                    >
                      {emp.april.efficiency.productivity}%
                    </TableCell>

                    {/** may */}

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                    >
                      {emp.may.income.quote}%
                    </TableCell>

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                      style={{
                        color:
                          emp.may.income.productivity < emp.may.income.quote
                            ? "red"
                            : "green",
                      }}
                    >
                      {emp.may.income.productivity}%
                    </TableCell>

                    {/** --- */}

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                    >
                      {emp.may.efficiency.quote}%
                    </TableCell>

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                      style={{
                        color:
                          emp.may.efficiency.productivity <
                          emp.may.efficiency.quote
                            ? "red"
                            : "green",
                      }}
                    >
                      {emp.may.efficiency.productivity}%
                    </TableCell>

                    {/** june */}

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                    >
                      {emp.june.income.quote}%
                    </TableCell>

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                      style={{
                        color:
                          emp.june.income.productivity < emp.june.income.quote
                            ? "red"
                            : "green",
                      }}
                    >
                      {emp.june.income.productivity}%
                    </TableCell>

                    {/** --- */}

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                    >
                      {emp.june.efficiency.quote}%
                    </TableCell>

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                      style={{
                        color:
                          emp.june.efficiency.productivity <
                          emp.june.efficiency.quote
                            ? "red"
                            : "green",
                      }}
                    >
                      {emp.june.efficiency.productivity}%
                    </TableCell>

                    {/** july */}

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                    >
                      {emp.july.income.quote}%
                    </TableCell>

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                      style={{
                        color:
                          emp.july.income.productivity < emp.july.income.quote
                            ? "red"
                            : "green",
                      }}
                    >
                      {emp.july.income.productivity}%
                    </TableCell>

                    {/** --- */}

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                    >
                      {emp.july.efficiency.quote}%
                    </TableCell>

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                      style={{
                        color:
                          emp.july.efficiency.productivity <
                          emp.july.efficiency.quote
                            ? "red"
                            : "green",
                      }}
                    >
                      {emp.july.efficiency.productivity}%
                    </TableCell>

                    {/** august */}

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                    >
                      {emp.august.income.quote}%
                    </TableCell>

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                      style={{
                        color:
                          emp.august.income.productivity <
                          emp.august.income.quote
                            ? "red"
                            : "green",
                      }}
                    >
                      {emp.august.income.productivity}%
                    </TableCell>

                    {/** --- */}

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                    >
                      {emp.august.efficiency.quote}%
                    </TableCell>

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                      style={{
                        color:
                          emp.august.efficiency.productivity <
                          emp.august.efficiency.quote
                            ? "red"
                            : "green",
                      }}
                    >
                      {emp.august.efficiency.productivity}%
                    </TableCell>

                    {/** september */}

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                    >
                      {emp.september.income.quote}%
                    </TableCell>

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                      style={{
                        color:
                          emp.september.income.productivity <
                          emp.september.income.quote
                            ? "red"
                            : "green",
                      }}
                    >
                      {emp.september.income.productivity}%
                    </TableCell>

                    {/** --- */}

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                    >
                      {emp.september.efficiency.quote}%
                    </TableCell>

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                      style={{
                        color:
                          emp.september.efficiency.productivity <
                          emp.september.efficiency.quote
                            ? "red"
                            : "green",
                      }}
                    >
                      {emp.september.efficiency.productivity}%
                    </TableCell>

                    {/** october */}

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                    >
                      {emp.october.income.quote}%
                    </TableCell>

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                      style={{
                        color:
                          emp.october.income.productivity <
                          emp.october.income.quote
                            ? "red"
                            : "green",
                      }}
                    >
                      {emp.october.income.productivity}%
                    </TableCell>

                    {/** --- */}

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                    >
                      {emp.october.efficiency.quote}%
                    </TableCell>

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                      style={{
                        color:
                          emp.october.efficiency.productivity <
                          emp.october.efficiency.quote
                            ? "red"
                            : "green",
                      }}
                    >
                      {emp.october.efficiency.productivity}%
                    </TableCell>

                    {/** november */}

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                    >
                      {emp.november.income.quote}%
                    </TableCell>

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                      style={{
                        color:
                          emp.november.income.productivity <
                          emp.november.income.quote
                            ? "red"
                            : "green",
                      }}
                    >
                      {emp.november.income.productivity}%
                    </TableCell>

                    {/** --- */}

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                    >
                      {emp.november.efficiency.quote}%
                    </TableCell>

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                      style={{
                        color:
                          emp.november.efficiency.productivity <
                          emp.november.efficiency.quote
                            ? "red"
                            : "green",
                      }}
                    >
                      {emp.november.efficiency.productivity}%
                    </TableCell>

                    {/** december */}

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                    >
                      {emp.december.income.quote}%
                    </TableCell>

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                      style={{
                        color:
                          emp.december.income.productivity <
                          emp.december.income.quote
                            ? "red"
                            : "green",
                      }}
                    >
                      {emp.december.income.productivity}%
                    </TableCell>

                    {/** --- */}

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                    >
                      {emp.december.efficiency.quote}%
                    </TableCell>

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                      style={{
                        color:
                          emp.december.efficiency.productivity <
                          emp.december.efficiency.quote
                            ? "red"
                            : "green",
                      }}
                    >
                      {emp.december.efficiency.productivity}%
                    </TableCell>

                    {/** 1Q */}

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                    >
                      {emp["1Q"].income.quote}%
                    </TableCell>

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                      style={{
                        color:
                          emp["1Q"].income.productivity < emp["1Q"].income.quote
                            ? "red"
                            : "green",
                      }}
                    >
                      {emp["1Q"].income.productivity}%
                    </TableCell>

                    {/** --- */}

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                    >
                      {emp["1Q"].efficiency.quote}%
                    </TableCell>

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                      style={{
                        color:
                          emp["1Q"].efficiency.productivity <
                          emp["1Q"].efficiency.quote
                            ? "red"
                            : "green",
                      }}
                    >
                      {emp["1Q"].efficiency.productivity}%
                    </TableCell>

                    {/** 2Q */}

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                    >
                      {emp["2Q"].income.quote}%
                    </TableCell>

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                      style={{
                        color:
                          emp["2Q"].income.productivity < emp["2Q"].income.quote
                            ? "red"
                            : "green",
                      }}
                    >
                      {emp["2Q"].income.productivity}%
                    </TableCell>

                    {/** --- */}

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                    >
                      {emp["2Q"].efficiency.quote}%
                    </TableCell>

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                      style={{
                        color:
                          emp["2Q"].efficiency.productivity <
                          emp["2Q"].efficiency.quote
                            ? "red"
                            : "green",
                      }}
                    >
                      {emp["2Q"].efficiency.productivity}%
                    </TableCell>

                    {/** 3Q */}

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                    >
                      {emp["3Q"].income.quote}%
                    </TableCell>

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                      style={{
                        color:
                          emp["3Q"].income.productivity < emp["3Q"].income.quote
                            ? "red"
                            : "green",
                      }}
                    >
                      {emp["3Q"].income.productivity}%
                    </TableCell>

                    {/** --- */}

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                    >
                      {emp["3Q"].efficiency.quote}%
                    </TableCell>

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                      style={{
                        color:
                          emp["3Q"].efficiency.productivity <
                          emp["3Q"].efficiency.quote
                            ? "red"
                            : "green",
                      }}
                    >
                      {emp["3Q"].efficiency.productivity}%
                    </TableCell>

                    {/** 4Q */}

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                    >
                      {emp["4Q"].income.quote}%
                    </TableCell>

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                      style={{
                        color:
                          emp["4Q"].income.productivity < emp["4Q"].income.quote
                            ? "red"
                            : "green",
                      }}
                    >
                      {emp["4Q"].income.productivity}%
                    </TableCell>

                    {/** --- */}

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                    >
                      {emp["4Q"].efficiency.quote}%
                    </TableCell>

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                      style={{
                        color:
                          emp["4Q"].efficiency.productivity <
                          emp["4Q"].efficiency.quote
                            ? "red"
                            : "green",
                      }}
                    >
                      {emp["4Q"].efficiency.productivity}%
                    </TableCell>

                    {/** overall */}

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                    >
                      {emp.overall.income.quote}%
                    </TableCell>

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                      style={{
                        color:
                          emp.overall.income.productivity <
                          emp.overall.income.quote
                            ? "red"
                            : "green",
                      }}
                    >
                      {emp.overall.income.productivity}%
                    </TableCell>

                    {/** --- */}

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                    >
                      {emp.overall.efficiency.quote}%
                    </TableCell>

                    <TableCell
                      className='data-table-header text-center'
                      colSpan={1}
                      style={{
                        color:
                          emp.overall.efficiency.productivity <
                          emp.overall.efficiency.quote
                            ? "red"
                            : "green",
                      }}
                    >
                      {emp.overall.efficiency.productivity}%
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))
            : Array.from({ length: 10 }, (_, rowIndex) => (
                <TableRow key={rowIndex}>
                  {Array.from({ length: 49 }, (_, cellIndex) => (
                    <TableCell key={cellIndex} className='h-24 text-center'>
                      <SkeletonLoader loading={true} />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
        </TableBody>
      </Table>
      <div className='mb-5 flex items-center justify-between space-x-2 rounded-b-md bg-gray-200 py-1'>
        <p className='font-xs ml-5 py-3 pl-5 text-neutral-500'></p>
        <div className='align-center flex'>
          <p className='font-xs ml-5 py-3 pl-5 text-neutral-500'>
            {tableData.current * 10 - 9} /
            {tableData.current == tableData.last
              ? tableData.total
              : tableData.current * 10}{" "}
            of {tableData.total}
          </p>
          <div className='mt-1'>
            <Button
              onClick={() => updateTable(1)}
              disabled={tableData.current == 1}
            >
              <MdKeyboardDoubleArrowLeft size={20} />
            </Button>
            <Button
              size='sm'
              onClick={() => {
                updateTable(tableData.current - 1);
              }}
              disabled={tableData.current == 1}
            >
              <MdKeyboardArrowLeft size={20} />
            </Button>
            <Button
              size='sm'
              onClick={() => {
                updateTable(tableData.current + 1);
              }}
              disabled={tableData.current == tableData.last}
            >
              <MdKeyboardArrowRight size={20} />
            </Button>
            <Button
              onClick={() => updateTable(tableData.last)}
              disabled={tableData.current == tableData.last}
            >
              <MdKeyboardDoubleArrowRight size={20} />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DataTableProductivityYearly;
