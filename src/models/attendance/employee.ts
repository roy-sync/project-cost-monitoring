export type Employee = {
    id: number;
    name: { first: string, last: string };
    date: string,
    timespent: number;
    attendance: number;
    fullname: string;
    timespentformatted: string;
    attendanceformatted: string;
    leave: number;
    attendanceId: number;
};
