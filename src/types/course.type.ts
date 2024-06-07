import { Pagination } from './api.type';

export type Course = {
	id: number;
	courseName: string;
	description: string;
};

export type CourseFilter = {
	courseName: string;
	description: string;
};

export type CoursesResponse = {
	pagination: Pagination;
	courses: Course[];
};
