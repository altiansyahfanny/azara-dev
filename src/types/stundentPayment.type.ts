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
	forPayment: boolean;
	paymentStatus: boolean;
};

export type StudentPaymentFilter = {
	forPayment: boolean;
	paymentStatus?: string;
	firstName?: string;
	lastName?: string;
	classroomName?: string;
};

export type StudentPaymentsResponse = {
	pagination: Pagination;
	students: StudentPayment[];
};

export type StudentPaymentHistory = {
	id: number;
	forMonth: string;
	paymentDate: string;
	originalPrice: string;
	discount: number;
	amount: string;
	bankName: string;
	accountNumber: string;
	firstName: string;
	lastName: string;
	enrollmentId: number;
};

export type StudentPaymentHistoryFilter = {
	firstName?: string;
	lastName?: string;
	accountNumber?: string;
	bankName?: string;
	forMonth?: string;

	paymentDate?: Date;
};

export type PaymentsHistoryResponse = {
	pagination: Pagination;
	payments: StudentPaymentHistory[];
};
