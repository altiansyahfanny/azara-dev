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

export type Student = User & { studentId: number };

export type StudentsResponse = {
	pagination: Pagination;
	students: Student[];
};

export type TeacherFilterType = {
	firstName: string;
	lastName: string;
	email: string;
};

export type Teacher = User & { teacherId: number };

export type TeachersResponse = {
	pagination: Pagination;
	teachers: Teacher[];
};
