import { Filter } from "@/models/productivity/filter";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/axios/axiosInstance";
import { Productivity } from "@/models/productivity/productivity";

interface Project {
    id: number;
    title: string;
}

const tagArray: Filter[] = [
    { id: 1, name: "Dedicated", color: getRandomHexColor() },
    { id: 2, name: "Semi-Dedicated", color: getRandomHexColor() },
    { id: 3, name: "Default", color: getRandomHexColor() },
    { id: 4, name: "In-House Billable", color: getRandomHexColor() },
    { id: 5, name: "In-House Non-Billable", color: getRandomHexColor() },
    { id: 6, name: "Management", color: getRandomHexColor() },
    { id: 7, name: "Project Based Billable", color: getRandomHexColor() },
    { id: 8, name: "Project Based Non-Billable", color: getRandomHexColor() },
    { id: 9, name: "Task Based Billable", color: getRandomHexColor() },
    { id: 10, name: "Task Based Non-Billable", color: getRandomHexColor() },
    { id: 11, name: "Others", color: getRandomHexColor() }
];

interface ApiParams {
    tags?: string[];
    emp_id?: number;
    project_id?: number;
    start_date?: string;
    current_date?: number;
    prev_date?: number;
    end_date?: string;
}
interface Employees {
    id: number;
    full_name: string;
}

const initialProject: Filter = {
    id: 0,
    name: 'All'
};


interface PieChartData {
    name: string;
    value: number;
    color: string;
}



const currentDate = new Date(); // Get the current date
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).toString().padStart(2, '0');

type ProductivityStateV2 = {
    filterEmp: string,
    filterProj: string,
    filterTag: string,
    filterTagArray: string[],
    arrayTag: Filter[],
    arrayEmp: Filter[],
    arrayProject: Filter[],
    start_date: string,
    end_date: string,
    arrayProjectMain: Filter[],
    arrayEmpMain: Filter[],
    thisMonth: boolean,
    prevMonth: boolean,
    isCheckboxDisable: boolean,
    params: ApiParams,
    pieChartArray: PieChartData[],
    totalBillable: number,
    leaveCount: number,
    totalMonthHours: number,
    holidayCount: number,
    totalEstimateWithoutOthers: number,
    estimateQuota: number,
    totalActualWithoutOthers: number,
    productivityData: Productivity[],
    totalBillableConsume: number,
    totalEfficiency: number,
    tagsTotalLabel: string[],
    tagsTotalNumber: number[],
    tagsTotalColor: string[],
    tagsTotalEstimate: number[],
    tagsTotalActual: number[],
    totalDedicated: number
}


const initialState: ProductivityStateV2 = {
    filterEmp: '',
    filterProj: '',
    filterTag: '',
    arrayTag: tagArray,
    arrayEmp: [],
    arrayProject: [],
    filterTagArray: [],
    arrayProjectMain: [initialProject],
    arrayEmpMain: [],
    start_date: `${year}-${month}-01`,
    end_date: `${year}-${month}-01`,
    thisMonth: false,
    prevMonth: false,
    isCheckboxDisable: false,
    params: {},
    pieChartArray: [],
    totalBillable: 0,
    totalMonthHours: 0,
    leaveCount: 0,
    holidayCount: 0,
    totalEstimateWithoutOthers: 0,
    totalActualWithoutOthers: 0,
    productivityData: [],
    totalBillableConsume: 0,
    totalEfficiency: 0,
    tagsTotalLabel: [],
    tagsTotalNumber: [],
    tagsTotalColor: [],
    tagsTotalEstimate: [],
    tagsTotalActual: [],
    totalDedicated: 0,
    estimateQuota: 0
}

function getRandomHexColor() {
    // Generate random values for the red, green, and blue components.
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    // Convert the decimal values to hexadecimal and format them.
    const redHex = red.toString(16).padStart(2, '0');
    const greenHex = green.toString(16).padStart(2, '0');
    const blueHex = blue.toString(16).padStart(2, '0');

    // Combine the hexadecimal values to form a color code.
    const hexColor = `#${redHex}${greenHex}${blueHex}`;

    return hexColor;
}


export const productivityv2 = createSlice({
    name: "drawer",
    initialState,
    reducers: {
        fetchProject: (state, action) => {
            const project: Project[] = action.payload.data
            state.arrayProjectMain = [];
            project.forEach(element => {
                state.arrayProjectMain.push({ id: element.id, name: element.title, color: getRandomHexColor() });
            });

            state.arrayProject = state.arrayProjectMain;
        },

        fetchEmployees: (state, action) => {


            const isAdmin: boolean = action.payload.isAdmin;
            const empId: number = action.payload.empId;
            const employees: Employees[] = action.payload.data
            state.arrayEmpMain = [];

            if (isAdmin) {
                employees.forEach(element => {
                    state.arrayEmpMain.push({ id: element.id, name: element.full_name });
                });
            }

            if (!isAdmin) {
                const empData = employees.filter(e => e.id == empId);
                state.arrayEmpMain.push({ id: empData[0].id, name: empData[0].full_name });
            }

            // employees.forEach(element => {
            //     state.arrayEmpMain.push({ id: element.id, name: element.full_name });
            // });

            state.arrayEmp = state.arrayEmpMain;

        },

        changeEmp: (state, action) => {
            state.filterEmp = action.payload.employee;
            state.arrayEmp = state.arrayEmpMain.filter((e) => { return e.name.toLowerCase().includes(state.filterEmp.toLowerCase()) });

            if (state.filterEmp == "") {
                state.arrayEmp = state.arrayEmpMain;
            }
        },

        changeProject: (state, action) => {
            state.filterProj = action.payload.project;
            state.arrayProject = state.arrayProjectMain.filter((e) => { return e.name.toLowerCase().includes(state.filterProj.toLowerCase()) });

            if (state.filterProj == "") {
                state.arrayProject = state.arrayProjectMain;
            }
        },
        changeTagArray: (state, action) => {

            state.filterTagArray = state.arrayTag
                .filter(tag => action.payload.ids.includes(tag.id))
                .map(filteredTag => filteredTag.name);

        },
        updateDateData: (state, action) => {
            if (action.payload.type == "start_date") {
                state.start_date = action.payload.data
            }

            if (action.payload.type == "end_date") {
                state.end_date = action.payload.data
            }
        },
        updateMonthCheckBox: (state, action) => {
            if (action.payload.text == "current") {
                state.thisMonth = action.payload.isChecked;
                state.prevMonth = false;
            } else if (action.payload.text == "previous") {
                state.prevMonth = action.payload.isChecked
                state.thisMonth = false;
            }

            if (state.prevMonth || state.thisMonth) {
                state.isCheckboxDisable = true;
            }

            if (!state.prevMonth && !state.thisMonth) {
                state.isCheckboxDisable = false;
            }
        },
        updateFilter: (state) => {
            const date = new Date();
            let project: Filter[] = state.arrayProjectMain;
            const params: ApiParams = {};
            const employee = state.arrayEmpMain.filter((e) => e.name.toLowerCase().includes(state.filterEmp.toLowerCase()));

            params.tags = state.filterTagArray;

            if (employee.length >= 1) {
                params.emp_id = employee[0]['id']
            }

            if (state.filterProj.toLowerCase() !== "all" && state.filterProj !== "") {
                project = state.arrayProjectMain.filter((e) => e.name.toLowerCase().includes(state.filterProj.toLowerCase()));


                if (project.length == 1) {

                    params.project_id = project[0]['id'];
                }
            }

            if (state.thisMonth) {
                params.current_date = date.getMonth() + 1;
            } else if (state.prevMonth) {
                params.prev_date = date.getMonth();
            } else {
                params.start_date = state.start_date;
                params.end_date = state.end_date;
            }
         
            state.params = params;


        },
        filterReport: (state, action) => {
            const countProject = action.payload.data.projects;
            const income = action.payload.data.income;
            const efficiency = action.payload.data.efficiency;
            const tasks = action.payload.data.tags;
            const tagsOverall = action.payload.data.tagsOverAll;

            state.pieChartArray = Array.from(countProject.values()).map((element: any) => {

                const color = state.arrayProjectMain.filter(e => e.name == element.name);

                return {
                    name: element.name,
                    value: element.count,
                    color: color.length != 0 ? color[0].color : element.color
                };
            });

            state.tagsTotalLabel = [];
            state.tagsTotalNumber = [];
            state.tagsTotalColor = [];
            state.tagsTotalEstimate = [];
            state.tagsTotalActual = [];
            Array.from(tagsOverall.values()).forEach((element: any) => {
                console.log(element, element.estimate > 0);
                if (element.estimate > 0) {
                    state.tagsTotalLabel.push((element.tag === "") ? "None" : element.tag);
                    state.tagsTotalEstimate.push(Number(element.estimate.toFixed(2)));
                    state.tagsTotalActual.push(Number(element.actual.toFixed(2)));
                    state.tagsTotalNumber.push(element.percentage);

                    const color = tagArray.filter(e => e.name == element.tag);
                    console.log('color', color);
                    const value = color.length > 0 ? color[0]['color'] : '#efefef';
                    if (value) {
                        state.tagsTotalColor.push(value);
                    }
                }
            });

            state.totalBillable = parseFloat(income.totalPercent);
            state.totalMonthHours = parseFloat(income.estimateHours);
            state.leaveCount = action.payload.data.leave;
            state.holidayCount = action.payload.data.holidays;
            state.totalBillableConsume = parseFloat(income.spentHours);
            state.totalDedicated = parseFloat(income.dedicated);

            state.totalEstimateWithoutOthers = parseFloat(efficiency.estimateHours);
            state.totalActualWithoutOthers = parseFloat(efficiency.spentHours);
            state.totalEfficiency = parseFloat(efficiency.totalPercent);
            state.estimateQuota = action.payload.data.quota;

            state.productivityData = tasks;


        }

    }
});

export const {
    fetchProject,
    fetchEmployees,
    changeEmp,
    updateFilter,
    changeProject,
    changeTagArray,
    updateDateData,
    updateMonthCheckBox,
    filterReport
} = productivityv2.actions

export default productivityv2.reducer;