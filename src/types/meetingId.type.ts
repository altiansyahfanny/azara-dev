export type MeetingId = {
    id: number;
    startTime: string;
    endTime: string;
    meetingDate: string;
    meetingNumber: number;
    classroomCourseId: number;
    teacherAttendance: "present" | "represented" | "absent";
    representedBy: string;
    isVerified: boolean;
    handBook?: string;
    notes?: string;
    evidenceImageUrl?: string;
    teacher: MeetingTeacher;
    course: MeetingCourse;
    classroom: MeetingClassroom;
    cycle: MeetingCycle;
    students: MeetingStudent[];
};
export type MeetingStudent = {
    firstName: string;
    lastName: string;
    studentId: number;
};

type MeetingTeacher = {
    firstName: string;
    lastName: string;
    teacherId: number;
};

type MeetingCourse = {
    id: number;
    courseName: string;
    description: string;
};

type MeetingClassroom = {
    id: number;
    classroomName: string;
    price: number;
};

type MeetingCycle = {
    description: string;
    startDate: string;
    endDate: string;
};

export type MeetingAttendance = {
    id: number;
    status: "present" | "absent";
    classMeetingId: number;
    studentId: number;
    firstName: string;
    lastName: string;
};
