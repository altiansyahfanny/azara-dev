import { Pagination } from './api.type';

export type ClassroomCourse = {
	id: number;
	courseName: string;
	description: string;
	teacher: {
		teacherId: number;
		firstName: string;
		lastName: string;
	};
	paymentPrice: number;
};

export type ClassroomStudent = {
	firstName: string;
	lastName: string;
};

export type Classroom = {
	id: number;
	classroomName: string;
	cycleDescription: string;
	price: number;
};

export type ClassroomId = {
	id: number;
	classroomName: string;
	price: number;
	cycleDescription: string;
	students: ClassroomStudent[];
	courses: ClassroomCourse[];
};

export type ClassroomFilter = {
	classroomName?: string;
	cycleDescription?: string;
	price?: string;
};

export type ClassroomsResponse = {
	pagination: Pagination;
	classrooms: Omit<Classroom, 'students'>[];
};
