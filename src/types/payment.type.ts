import { Pagination } from './api.type';

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
	startFrom?: string;
	endTo?: string;
};

export type PaymentsResponse = {
	pagination: Pagination;
	payments: Payment[];
};

export type PaymentHistory = {
	id: number;
	recipientName: string;
	amount: number;
	paymentDate: string;
	teacherId: number;
	accountNumber: string;
	bankName: string;
};

export type PaymentHistoryFilter = {
	recipientName?: string;

	paymentDate?: {
		startFrom?: string;
		endTo?: string;
	};
};

export type PaymentsHistoryResponse = {
	pagination: Pagination;
	payments: PaymentHistory[];
};
