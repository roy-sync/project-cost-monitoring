"use client";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import DataTableProductivityYearly from "./yearly-data-table";
import axiosInstance from "@/axios/axiosInstance";
import { RootState } from "@/redux/store";
import { initData, changeYear } from "@/redux/features/yearly-slice";
import DynamicSelect from "@/components/Select";

async function fetchData(apiEndpoint: string, page: number, year: number) {
  try {
    const response = await axiosInstance.get(apiEndpoint, { params: { page, year } });
    return response.data;
  } catch (error) {
    throw error;
  }
}

interface Option {
  value: string;
  label: string;
}

const YearlyProductivityTable = () => {
  const dispatch = useDispatch();

  const dataSelector = (state: RootState) => state.yearly.report;
  const data = useSelector(dataSelector);

  const currentPageSelector = (state: RootState) => state.yearly.curr_page;
  const currentPage = useSelector(currentPageSelector);

  const lastPageSelector = (state: RootState) => state.yearly.last_page;
  const lastPage = useSelector(lastPageSelector);

  const totalEmpSelector = (state: RootState) => state.yearly.total;
  const totalEmp = useSelector(totalEmpSelector);

  const yearSelector = (state: RootState) => state.yearly.year;
  const year = useSelector(yearSelector);

  var options: Option[] = [];
  for (var i = 0; i < 100; i++) {
    const year: number = new Date().getFullYear();
    const transform: string = (year - i).toString();
    options.push({ value: transform, label: transform });
  }

  dispatch(changeYear({ year: parseInt(options[0].value) }));

  const TableData = {
    current: currentPage,
    last: lastPage,
    total: totalEmp,
    year: year
  };

  const handleYearChange = (newYear: number) => {
    dispatch(changeYear({ year: newYear }));

    fetchData("/yearly", 1, newYear)
      .then((data) => {
        dispatch(initData(data));
      })
      .catch((error) => {
        console.error("Error fetching data from API:", error);
      });
  };

  useEffect(() => {
    fetchData("/yearly", 1, year)
      .then((data) => {
        dispatch(initData(data));
      })
      .catch((error) => {
        console.error("Error fetching data from API:", error);
      });
  }, []);




  return (
    <div className='mb-2 p-4'>
      <DynamicSelect options={options} onChangeYear={handleYearChange} />
      <DataTableProductivityYearly data={data} tableData={TableData} />
    </div>
  );
};

export default YearlyProductivityTable;
