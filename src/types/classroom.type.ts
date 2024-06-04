import { PaginationType } from './api.type';
import { UserType } from './user.type';

export type ClassroomType = {
	id: number;
	classroomName: string;
	price: number;
	cycleDescription: string;
	students: Pick<UserType, 'firstName' | 'lastName'>[];
};

export type ClassroomFilterType = {
	classroomName: string;
	description: string;
};

export type ClassroomsResponseType = {
	pagination: PaginationType;
	classrooms: Omit<ClassroomType, 'students'>[];
};
