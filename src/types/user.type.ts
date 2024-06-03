import { PaginationType } from './api.type';

export type UserType = {
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

export type StudentsResponseType = {
	pagination: PaginationType;
	students: UserType[];
};
