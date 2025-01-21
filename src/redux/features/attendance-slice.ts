import { Employee } from "@/models/attendance/employee";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type EmployeeName = {
    name: string
}

type AttendanceState = {
    employees: Employee[],
    dateRangeEmployee: Employee[],
    graphData: Employee[],
    start_date: string,
    end_date: string,
    empSearchList: EmployeeName[],
};


const initialState: AttendanceState = {
    employees: [],
    dateRangeEmployee: [],
    graphData: [],
    start_date: "",
    end_date: "",
    empSearchList: []

}

function filterByDate(empData: Employee[], start_date: string, end_date: string) {
    empData = empData.filter((item) => item.date >= start_date);
    empData = empData.filter((item) => item.date <= end_date);

    return empData;
}

function filterByName(empData: Employee[], searchList: EmployeeName[]) {
    return empData.filter((employee) =>
        searchList.some((searchItem) => {
            return employee.fullname === searchItem.name;
        })
    );
}

export const attendance = createSlice({
    name: "drawer",
    initialState,
    reducers: {
        addEmployeeToMultiSearch: (state, action) => {
            const isEmpPresent = state.empSearchList.some((data) => data.name === action.payload);
            if (!isEmpPresent) {

                state.empSearchList.push(...[{ name: action.payload }]);

                var empData: Employee[] = filterByName(state.employees, state.empSearchList);

                empData = filterByDate(empData, state.start_date, state.end_date);
                state.dateRangeEmployee = empData;
                state.graphData = state.dateRangeEmployee.slice(0, 10);

            }

        },
        deleteAllMultiSearch: (state) => {
            state.dateRangeEmployee = filterByDate(state.employees, state.start_date, state.end_date);
            state.empSearchList = [];
            state.graphData = state.dateRangeEmployee.slice(0, 10);
        },
        deleteEmployeeInMultiSearch: (state, action) => {
            state.dateRangeEmployee = state.dateRangeEmployee.filter((item, index) => item.fullname != action.payload);

            state.empSearchList = state.empSearchList.filter((item, index) => item.name != action.payload);

            if (state.dateRangeEmployee.length == 0) {
                state.dateRangeEmployee = filterByDate(state.employees, state.start_date, state.end_date);
            }
            state.graphData = state.dateRangeEmployee.slice(0, 10);
        },
        addDataFromApi: (state, action) => {
            state.employees.push(action.payload);
        },
        addDataToGraphByBatch: (state, action) => {
            const data = state.dateRangeEmployee.slice(action.payload.start, action.payload.end);
            state.graphData = data;
        },
        updateDateData: (state, action) => {


            var payload_employee: Employee[] = [];


            /* The code snippet is checking the type of the payload received in the action and updating
            the `start_date` and `end_date` properties in the state accordingly. */
            if (action.payload.type == "start_date") {
                state.start_date = action.payload.data
            }

            if (action.payload.type == "end_date") {
                state.end_date = action.payload.data
            }

            /* The code snippet is checking if both `start_date` and `end_date` in the state are not
            empty strings. If they are not empty, it means that the user has selected a date range. */
            if (state.start_date != "" && state.end_date != "") {
                payload_employee = filterByDate(state.employees, state.start_date, state.end_date);
            }

            /* The code snippet is checking if the `empSearchList` in the state is not empty. If it is
            not empty, it means that the user has added some employees to the multi-search list. */
            if (state.empSearchList.length != 0) {
                payload_employee = filterByName(payload_employee, state.empSearchList);
            }


            /* `state.dateRangeEmployee = payload_employee;` assigns the filtered employee data based
            on the selected date range and employee search list to the `dateRangeEmployee` property
            in the state. This means that `dateRangeEmployee` will now contain only the employees
            that match the selected date range and employee search list. */
            state.dateRangeEmployee = payload_employee;
            state.graphData = state.dateRangeEmployee.slice(0, 10);
        },

        initialDateData: (state, action) => {

            state.end_date = action.payload.last.formatDate;
            state.start_date = action.payload.first.formatDate;

            state.dateRangeEmployee = filterByDate(state.employees, state.start_date, state.end_date);
            state.graphData = state.dateRangeEmployee.slice(0, 10);

        }



    }
});

export const {
    addEmployeeToMultiSearch,
    deleteAllMultiSearch,
    deleteEmployeeInMultiSearch,
    addDataFromApi,
    addDataToGraphByBatch,
    updateDateData,
    initialDateData
} = attendance.actions

export default attendance.reducer;