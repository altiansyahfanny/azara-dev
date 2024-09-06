import { Pagination } from './api.type';

export type StudentPayment = {
	studentId: number;
	address: string;
	userId: number;
	firstName: string;
	lastName: string;
	classroomId: number;
	classroomName: string;
	classroomPrice: number;
	enrollmentId: number;
	forPayment?: boolean;
};

export type StudentPaymentFilter = {
	forPayment: boolean;
	firstName?: string;
	lastName?: string;
	classroomName?: string;
};

export type StudentPaymentsResponse = {
	pagination: Pagination;
	students: StudentPayment[];
};
