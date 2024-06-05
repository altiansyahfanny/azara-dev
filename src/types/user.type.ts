import { Pagination } from './api.type';

export type User = {
	firstName: string;
	lastName: string;
	email: string;
	imageUrl: string;
};

export type StudentFilterType = {
	firstName: string;
	lastName: string;
	email: string;
};

export type StudentsResponse = {
	pagination: Pagination;
	students: User[];
};
