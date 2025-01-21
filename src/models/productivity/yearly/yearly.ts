import { monthlyProd } from "@/models/monthly-prod";

export type Yearly = {
    id: number;
    name: string;
    january: monthlyProd;
    febraury: monthlyProd;
    march: monthlyProd;
    april: monthlyProd;
    may: monthlyProd;
    june: monthlyProd;
    july: monthlyProd;
    august: monthlyProd;
    september: monthlyProd;
    october: monthlyProd;
    november: monthlyProd;
    december: monthlyProd;
    '1Q': monthlyProd;
    '2Q': monthlyProd;
    '3Q': monthlyProd;
    '4Q': monthlyProd;
    overall: monthlyProd;
};



