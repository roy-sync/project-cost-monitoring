import { ApiData } from "@/models/productivity/yearly/apidata";
import { Yearly } from "@/models/productivity/yearly/yearly";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type YearlyState = {
    report: Yearly[],
    last_page: number,
    curr_page: number,
    total: number,
    year: number,
};


const initialState: YearlyState = {
    report: [],
    last_page: 0,
    curr_page: 0,
    total: 0,
    year: 0
}

export const yearly = createSlice({
    name: "drawer",
    initialState,
    reducers: {
        initData: (state, action) => {
            const data: ApiData = action.payload.data

            state.report = [];
            state.last_page = data.last_page;
            state.curr_page = data.current_page;
            state.report = data.data;
            state.total = data.total;
        },
        changeYear: (state, action) => {
            state.year = action.payload.year;
        }

    }
});

export const {
    initData,
    changeYear

} = yearly.actions

export default yearly.reducer;