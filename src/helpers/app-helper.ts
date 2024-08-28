import { ApiResponse, ErrorResponse } from "@/types/api.type";
import toast from "react-hot-toast";

export const formatNumber = (numbers: number) => {
    const options = {
        style: "decimal",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    };
    return new Intl.NumberFormat("id-ID", options).format(numbers);
};

export const parseStringCurrencyToNumber = (str: string) => {
    return Number(str.replace(/\./g, ""));
};

export const catchFunc = (err: unknown) => {
    const error = err as ApiResponse<ErrorResponse>;
    console.log("catchFunc : ", error.data.message);
    toast.error(error.data.message);
};

export const teacherAttendaceStatusMapper = {
    present: "Hadir",
    absent: "Absen",
    leave: "Izin",
    represented: "Diwakilkan",
};
