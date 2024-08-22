import { Pagination } from "./api.type";

export type Meeting = {
    id: number;
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
    subjectMatter: string;
    handBook: string;
    isVerified: boolean;
    evidenceImageUrl?: any;
    paymentPrice: number;
    classroomName: string;
    courseName: string;
    firstName: string;
    lastName: string;
};

export type MeetingFilter = {
    isVerified?: string;
    classroomName?: string;
    courseName?: string;
    meetingDate?: {
        startFrom?: string;
        endTo?: string;
    };
};

export type MeetingsResponse = {
    pagination: Pagination;
    meetings: Meeting[];
};
