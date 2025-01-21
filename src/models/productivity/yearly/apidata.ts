import { Yearly } from "./yearly";

export type ApiData = {
    last_page: number;
    current_page: number;
    data: Yearly[],
    total: number;
};



