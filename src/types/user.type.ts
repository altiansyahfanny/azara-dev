import { Pagination } from "./api.type";

export type User = {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    imageUrl: string;
    address: string;
};

export type UserDetail = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    imageUrl: string;
    role: string;
    address: string;
};

export type StudentFilter = {
    firstName?: string;
    lastName?: string;
};

export type Student = User & { studentId: number };

export type StudentsResponse = {
    pagination: Pagination;
    students: Student[];
};

export type TeacherFilter = {
    firstName?: string;
    lastName?: string;
};

export type Teacher = User & { teacherId: number };

export type TeachersResponse = {
    pagination: Pagination;
    teachers: Teacher[];
};
