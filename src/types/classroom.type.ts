import { Pagination } from './api.type';
import { User } from './user.type';

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

export type Classroom = {
	id: number;
	classroomName: string;
	price: number;
	cycleDescription: string;
	students: Pick<User, 'firstName' | 'lastName'>[];
	courses: ClassroomCourse[];
};

export type ClassroomFilter = {
	classroomName: string;
	description: string;
};

export type ClassroomsResponse = {
	pagination: Pagination;
	classrooms: Omit<Classroom, 'students'>[];
};
