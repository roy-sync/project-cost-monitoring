"use client";

import SearchInput from "../search-input";
import Select from "react-select";
import { RootState } from "@/redux/store";
import { DateRange } from "../date-range";
import { Button, Checkbox, CircularProgress, FormControlLabel } from "@mui/material";
import { useEffect, useState } from "react";
import axiosInstance from "@/axios/axiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { TableData } from "@/models/productivity/totaltable";

import {
  fetchProject,
  fetchEmployees,
  changeEmp,
  updateFilter,
  changeProject,
  changeTagArray,
  updateDateData,
  updateMonthCheckBox,
  filterReport,
} from "@/redux/features/productivity-slic2-v2";
import { ProductivityPieChart } from "./charts/pie-chart";
import CardIncome from "./card-income";
import Card from "./card";
import ProductivityListTable from "./productivty-table";
import { Pie3D } from "react-pie3d";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Title,
  Legend,
  Plugin,
} from "chart.js";
import EstimateChart from "./estimate-report";
import TableEstimateData from "./table-total-estimate";
import CardIncomeProductivity from "./card-income-productivity-graph";
import CardIncomeProductivityGraph from "./card-income-productivity-graph";
import CardIncomeProductivityTable from "./card-income-productivity-table";
import CardIncomeProductivityTableHours from "./card-income-productivity-table-total-hours";

interface ApiParams {
  tags?: string[];
  emp_id?: number;
  project_id?: number;
  start_date?: string;
  current_date?: number;
  prev_date?: number;
  end_date?: string;
}

async function fetchData(apiEndpoint: string, params: ApiParams = {}) {
  try {
    const response = await axiosInstance.get(apiEndpoint, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
}

interface Option {
  value: string;
  label: string;
}

interface Auth {
  empId: number;
  isAdminStaff: boolean;
}

interface ProductivityContainerV2Props {
  auth: Auth;
}

interface TableProps {
  column1: string;
  column2: string;
  column3: string;
}

const ProductivityContainerv2: React.FC<ProductivityContainerV2Props> = ({
  auth,
}) => {
  const dispatch = useDispatch();

  const tagSelector = (state: RootState) => state.productivityV2.arrayTag;
  const tagSelectedSelector = (state: RootState) =>
    state.productivityV2.filterTagArray;
  const paramsSelector = (state: RootState) => state.productivityV2.params;
  const empSelector = (state: RootState) => state.productivityV2.arrayEmp;
  const projSelector = (state: RootState) => state.productivityV2.arrayProject;
  const empValSelector = (state: RootState) => state.productivityV2.filterEmp;
  const tagValSelector = (state: RootState) => state.productivityV2.filterTag;
  const projValSelector = (state: RootState) => state.productivityV2.filterProj;
  const startDateSelector = (state: RootState) =>
    state.productivityV2.start_date;
  const endDateSelector = (state: RootState) => state.productivityV2.end_date;
  const thisMonthSelector = (state: RootState) =>
    state.productivityV2.thisMonth;
  const prevMonthSelector = (state: RootState) =>
    state.productivityV2.prevMonth;
  const isCheckboxDisableSelector = (state: RootState) =>
    state.productivityV2.isCheckboxDisable;
  const pieChartDataSelector = (state: RootState) =>
    state.productivityV2.pieChartArray;

  const totalBillableSelector = (state: RootState) =>
    state.productivityV2.totalBillable;
  const totalBillableConsumeSelector = (state: RootState) =>
    state.productivityV2.totalBillableConsume;
  const totalEstimateWithoutOthersSelector = (state: RootState) =>
    state.productivityV2.totalEstimateWithoutOthers;
  const totalActualWithoutOthersSelector = (state: RootState) =>
    state.productivityV2.totalActualWithoutOthers;
  const totalDedicatedSelector = (state: RootState) => state.productivityV2.totalDedicated;
  const estimateQuotaSelector = (state: RootState) =>
    state.productivityV2.estimateQuota;

  const leaveCountSelector = (state: RootState) =>
    state.productivityV2.leaveCount;
  const totalMonthSelector = (state: RootState) =>
    state.productivityV2.totalMonthHours;
  const holidayCountSelector = (state: RootState) =>
    state.productivityV2.holidayCount;

  const totalEfficiencySelector = (state: RootState) =>
    state.productivityV2.totalEfficiency;

  const tagsTotalLabelSelector = (state: RootState) =>
    state.productivityV2.tagsTotalLabel;
  const tagsTotalNumberSelector = (state: RootState) =>
    state.productivityV2.tagsTotalNumber;
  const tagsTotalColorSelector = (state: RootState) =>
    state.productivityV2.tagsTotalColor;
  const tagsTotalEstimateSelector = (state: RootState) =>
    state.productivityV2.tagsTotalEstimate;
  const tagsTotalActualSelector = (state: RootState) =>
    state.productivityV2.tagsTotalActual

  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [loading, setLoading] = useState(false);
  /*** end of selector */

  const tagFilters = useSelector(tagSelector);
  const empFilters = useSelector(empSelector);
  const projFilters = useSelector(projSelector);
  const parameters = useSelector(paramsSelector);

  const selectedTag = useSelector(tagSelectedSelector);
  const empVal: string = useSelector(empValSelector);
  const projVal: string = useSelector(projValSelector);
  const tagVal: string = useSelector(tagValSelector);

  const startDate = useSelector(startDateSelector);
  const endDate = useSelector(endDateSelector);

  const thisMonth = useSelector(thisMonthSelector);
  const prevMonth = useSelector(prevMonthSelector);

  const isCheckbox = useSelector(isCheckboxDisableSelector);
  const pieChartData = useSelector(pieChartDataSelector);

  const totalBillable = useSelector(totalBillableSelector);
  const totalBillableConsume = useSelector(totalBillableConsumeSelector);
  const totalEstimateWithoutOthers = useSelector(
    totalEstimateWithoutOthersSelector
  );
  // const estimateQuota = useSelector()
  const totalActualWithoutOthers = useSelector(
    totalActualWithoutOthersSelector
  );
  const totalDedicated = useSelector(totalDedicatedSelector);

  const estimateQuota = useSelector(estimateQuotaSelector);

  const leaveCount = useSelector(leaveCountSelector);

  const totalMonth = useSelector(totalMonthSelector);

  const totalHoliday = useSelector(holidayCountSelector);

  const totalEfficiency = useSelector(totalEfficiencySelector);

  const tagsTotalLabel = useSelector(tagsTotalLabelSelector);
  const tagsTotalNumber = useSelector(tagsTotalNumberSelector);
  const tagsTotalColor = useSelector(tagsTotalColorSelector);
  const tagsTotalEstimate = useSelector(tagsTotalEstimateSelector);
  const tagsTotalActual = useSelector(tagsTotalActualSelector);

  var optionsTag: Option[] = [];

  ChartJS.register(ArcElement, Tooltip, Title, Legend);

  const data = {
    labels: tagsTotalLabel,
    datasets: [
      {
        data: tagsTotalNumber,
        backgroundColor: tagsTotalColor,
        hoverBackgroundColor: tagsTotalColor,
        cutout: '60%',
        borderRaduis: 20,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    showAllTooltips: true,
    percentageInnerCutout: 80,
    plugins: {
      title: {
        display: true,
        text: "Total Load",
        mode: "nearest",
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (item: any) => item.parsed + "%",
        },
      },
      legend: {
        display: true,
        // position: "bottom",
      },
    },
  };

  const alwaysShowToolTip = {
    id: "alwaysShowTooltip",
    afterDraw: (chart: any, args: any, options: any) => {
      const {
        ctx,
        chartArea: { top, bottom, left, right, width, height },
      } = chart;

      chart.data.datasets.forEach((dataset: any, i: number) => {
        var prevX = 0;
        var prevYline = 100;
        chart
          .getDatasetMeta(i)
          .data.forEach((datapoints: any, index: number) => {

            if (dataset.data[index] > 1) {
              const { x, y } = datapoints.tooltipPosition();

              const halfwidth = width / 2;
              var halfHeight = height / 2;

              if (dataset.data.length > 4) {
                halfHeight = height * .75;
              }

              var checkDistance = x - prevX;
              var checkDistance =
                checkDistance < 0 ? checkDistance * -1 : checkDistance;

              var xLine = 0;
              var yLine = 0;
              var extraLine = 0;

              if (dataset.data[index] < 3) {
                xLine = x >= halfwidth ? x + 50 : x - 50;
                yLine = y >= halfHeight ? y + 70 : y - 70;
                extraLine = x >= halfwidth ? 50 : -50;
              } else {
                xLine = x >= halfwidth ? x + 50 : x - 50;
                yLine = y >= halfHeight ? y + 50 : y - 50;
                extraLine = x >= halfwidth ? 50 : -50;
              }


              ctx.beginPath();
              ctx.moveTo(x, y);
              ctx.lineTo(xLine, yLine);
              ctx.lineTo(xLine + extraLine, yLine);
              ctx.strokeStyle = "#000";
              ctx.stroke();

              const textWidth = ctx.measureText(chart.data.labels[index]).width;
              ctx.font = "12px Arial";

              const textXPosition = x >= halfwidth ? "left" : "right";
              const plusFivePx = x >= halfwidth ? 5 : -5;
              ctx.textAlign = textXPosition;
              ctx.baseLine = "middle";
              ctx.fillStyle = "#000";
              ctx.fillText(
                dataset.data[index] + "%",
                xLine + extraLine + plusFivePx,
                yLine
              );

              prevX = x;

            }

          });
      });
    },
  };

  const legendMargin = {
    id: "increase-legend-spacing",
    beforeInit(chart: any) {

      const originalFit = chart.legend.fit;
      chart.legend.fit = function fit() {
        originalFit.bind(chart.legend)();
        this.height += 50;
      }
    }
  };

  const plugins = [alwaysShowToolTip, legendMargin];

  tagFilters.forEach((e) => {
    optionsTag.push({ value: e.id.toString(), label: e.name });
  });

  const handleEmployeeChange = (value: string) => {
    const employee = value;

    dispatch(changeEmp({ employee: employee }));
  };

  const onFiliterChange = () => {
    // dispatch(updateFilter());
  };

  const handleProjChange = (value: string) => {
    const project = value;

    dispatch(changeProject({ project: project }));
  };

  const multiTagFilter = (data: Option[]) => {
    var ids: number[] = [];
    data.forEach((e) => {
      ids.push(parseInt(e.value));
    });
    dispatch(changeTagArray({ ids: ids }));
    // dispatch(updateFilter());
  };

  const onChangeDate = (type: string, value: string) => {
    dispatch(updateDateData({ type: type, data: value }));
    // dispatch(updateFilter());
  };

  const changeCheckBox = (isChecked: boolean, text: string) => {
    dispatch(updateMonthCheckBox({ isChecked: isChecked, text: text }));
    // dispatch(updateFilter());
  };

  const handleSubmitButtonClick = () => {
    if(Number(resultDate)) {
      alert('Invalid Date');
    } else {
      dispatch(updateFilter());
      setUpdateTrigger(prevState => !prevState);
      setLoading(true);
    }
  };

  const dataIncome: TableData = {
    id: 1,
    totalEstimate: totalBillable,
    totalSpent: totalBillableConsume,
    leave: leaveCount,
    totalMonth: totalMonth,
    holiday: totalHoliday,
    totalDedicated: totalDedicated
  };

  const dataEfficency: TableData = {
    id: 1,
    totalEstimate: totalEstimateWithoutOthers,
    totalSpent: totalActualWithoutOthers,
    totalEfficencyPercent: totalEfficiency,
    quota: estimateQuota
  };

  var tableDataEstimate: TableProps[] = [];

  tagsTotalLabel.forEach((element, index) => {
    tableDataEstimate.push({
      column1: element === "" ? "None" : element,
      column2: tagsTotalEstimate[index].toString(),
      column3: tagsTotalActual[index].toString()
    });
  });

  // Function to calculate the number of months between two dates
  function calculateMonthDifference(startDate: Date, endDate: Date): number {
    const startYear = startDate.getFullYear();
    const startMonth = startDate.getMonth();
    const endYear = endDate.getFullYear();
    const endMonth = endDate.getMonth();

    return (endYear - startYear) * 12 + (endMonth - startMonth) + 1;
  }

  // Function to classify the date range
  function classifyDateRange(startDate: Date, endDate: Date): string {
    const monthsDifference = calculateMonthDifference(startDate, endDate);

    if (monthsDifference === 1) {
        // If the difference is exactly 1 month, return the name of the month
        return startDate.toLocaleString('default', { month: 'long' });
    } else if (monthsDifference === 3) {
        // If the difference is exactly 3 months, check if it belongs to the first quarter (Jan-Mar)
        const startMonth = startDate.getMonth();
        const isQ1 = startMonth >= 0 && startMonth <= 2;
        const isQ2 = startMonth >= 3 && startMonth <= 5;
        const isQ3 = startMonth >= 6 && startMonth <= 8;
        const isQ4 = startMonth >= 9 && startMonth <= 11;

        if (isQ1) {
          return "1Q Average";
        }

        if (isQ2) {
          return "2Q Average";
        }

        if (isQ3) {
          return "3Q Average";
        }

        if (isQ4) {
          return "4Q Average";
        }
      
    }

    return `${monthsDifference}`;
  }
  const resultDate = classifyDateRange(new Date(startDate), new Date(endDate));

  useEffect(() => {
    // Fetch data from API 1
    fetchData("/projects/all")
      .then((data) => {
        dispatch(fetchProject(data));
      })
      .catch((error) => {
        console.error("Error fetching data from API 1:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch data from API 1
    var isAdmin = auth.isAdminStaff;
    var empId = auth.empId;

    fetchData("/employees")
      .then((data) => {
        dispatch(
          fetchEmployees({ data: data.data, isAdmin: isAdmin, empId: empId })
        );
      })
      .catch((error) => {
        console.error("Error fetching data from API 1:", error);
      });
  }, []);

  useEffect(() => {
    const params: ApiParams = parameters;
    fetchData("/productivity/report-v2", params)
      .then((data) => {
        dispatch(filterReport(data));
      })
      .catch((error) => {
        console.error("Error fetching data from report API:", error);
      })
      .finally(() => {
        // Simulate a delay of at least 3 seconds for the throbber
        setTimeout(() => {
          setLoading(false); // Set loading to false after delay
        }, 3000);
      });
  }, [
    updateTrigger
  ]);

  return (
    <>
      <div className='px-4 pt-3'>
        <div>
          <div>
            <h4 className='text-center text-3xl font-bold'>
              Productivity Report
            </h4>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-2 px-4 pt-3'>
        <div className='col-span-1'>
          <div className='border border-gray-200 p-3 sm:rounded-lg'>
            <h4 className='text-sm font-bold'>Filters</h4>

            <SearchInput
              value={empVal}
              onChange={handleEmployeeChange}
              filterChange={onFiliterChange}
              lists={empFilters}
              placeholder='Search Employee'
            />

            <SearchInput
              value={projVal}
              onChange={handleProjChange}
              filterChange={onFiliterChange}
              lists={projFilters}
              placeholder='Search Project'
            />
            <Select
              id='selectTag'
              instanceId='selectTag'
              isMulti
              name='tags'
              className='basic-multi-select !focus:border-none z-10'
              classNamePrefix='select'
              options={optionsTag}
              onChange={(e) => multiTagFilter(e as Option[])}
            />

            <hr className='my-3' />
            <DateRange
              startDate={startDate}
              endDate={endDate}
              onChange={onChangeDate}
              label=''
              disable={isCheckbox}
            />

            {/* <FormControlLabel
              control={
                <Checkbox
                  checked={thisMonth}
                  onChange={(e) => changeCheckBox(e.target.checked, "current")}
                />
              }
              label='This month'
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={prevMonth}
                  onChange={(e) => changeCheckBox(e.target.checked, "previous")}
                />
              }
              label='Previous month'
            /> */}
            <hr className='my-3' />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmitButtonClick}
            >
              Submit Data
            </Button>
            {loading && (
        <div className="fixed top-0 left-0 w-full h-full bg-white opacity-75 flex justify-center items-center z-50">
          <CircularProgress size={80} thickness={4} color="primary" />
        </div>
      )}
          </div>
        </div>
        <div className='col-span-2'>
          <CardIncomeProductivityGraph title={classifyDateRange(new Date(startDate), new Date(endDate))} dataIncome={dataIncome} dataEfficency={dataEfficency}/>
        </div>
      </div>
      <ProductivityListTable />
      <div className='my-4 gap-2 px-4 pt-3 flex justify-center'>
        <CardIncomeProductivityTable title={classifyDateRange(new Date(startDate), new Date(endDate))} dataIncome={dataIncome} dataEfficency={dataEfficency}/>
      </div>
      <div className="my-4 mt-3 px-4 pt-3 flex space-x-4">
        <CardIncomeProductivityTableHours title={classifyDateRange(new Date(startDate), new Date(endDate))} dataIncome={dataIncome} dataEfficency={dataEfficency}/>
        <TableEstimateData data={tableDataEstimate} />
      </div>

      <EstimateChart
                  tagsTotalLabel={tagsTotalLabel}
                  data={data}
                  options={options}
                  plugins={plugins}
              />
    </>
  );
};

export default ProductivityContainerv2;
