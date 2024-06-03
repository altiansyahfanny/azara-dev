import { PaginationType } from './api.type';

export type CourseType = {
	courseName: string;
	description: string;
};

export type CourseFilterType = {
	courseName: string;
	description: string;
};

export type CoursesResponseType = {
	pagination: PaginationType;
	courses: CourseType[];
};
