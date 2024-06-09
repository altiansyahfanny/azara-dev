export type EnrollStudentRequest = {
	studentId: number;
	classroomId: number;
	joinDate: string;
};

export type AssignTeacherAndCourseSchemaRequest = {
	teacherId: number;
	classroomId: number;
	paymentPrice: number;
	courseId: number;
};
