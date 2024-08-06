import { Pagination } from './api.type';

export type Meeting = {
	classroomCourseId: number;
	classroomId: number;
	courseId: number;
	teacherId: number;

	startTime: string;
	endTime: string;
	meetingDate: string;
	meetingNumber: number;
	teacherAttendance: string;
	representedBy: string;
	isVerified: boolean;
	evidenceImageUrl?: any;
	paymentPrice: number;
	classroomName: string;
	courseName: string;
	firstName: string;
	lastName: string;
};

export type MeetingFilter = {
	isVerified?: boolean;
	classroomName?: string;
};

export type MeetingsResponse = {
	pagination: Pagination;
	meetings: Meeting[];
};
