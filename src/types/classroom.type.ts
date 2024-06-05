import { Pagination } from './api.type';
import { User } from './user.type';

export type Classroom = {
	id: number;
	classroomName: string;
	price: number;
	cycleDescription: string;
	students: Pick<User, 'firstName' | 'lastName'>[];
};

export type ClassroomFilter = {
	classroomName: string;
	description: string;
};

export type ClassroomsResponse = {
	pagination: Pagination;
	classrooms: Omit<Classroom, 'students'>[];
};
