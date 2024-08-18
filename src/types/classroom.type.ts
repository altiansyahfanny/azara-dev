import { Pagination } from "./api.type";

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
    enrollmentId: number;
    studentId: number;
    firstName: string;
    lastName: string;
    joinDate: string;
};

export type Classroom = {
    id: number;
    classroomName: string;
    cycleId: number;
    cycleDescription: string;
    price: number;
};

export type ClassroomId = {
    id: number;
    classroomName: string;
    cycleId: number;
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
    classrooms: Omit<Classroom, "students">[];
};

export type ClassroomCourses = {
    id: number;
    teacherId: number;
    classroomId: number;
    courseId: number;
    classroomName: string;
    courseName: string;
    paymentPrice: number;
};

export type ClassroomCoursesResponse = {
    pagination: Pagination;
    classroomCourses: ClassroomCourses[];
};
