import { Pagination } from "./api.type";

export type Payment = {
    teacherId: number;
    teacherAttendance: string;
    representedBy?: string;
    totalPayment: string;
    firstName: string;
    lastName: string;
    accountNumber?: string;
    bankName?: string;
};

export type PaymentFilter = {
    teacherAttendance?: string;
    representedBy?: string;
    totalPayment?: string;
    firstName?: string;
    lastName?: string;
    accountNumber?: string;
    bankName?: string;
};

export type PaymentsResponse = {
    pagination: Pagination;
    payments: Payment[];
};
