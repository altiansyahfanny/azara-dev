import { Classroom, ClassroomStudent } from "@/types/classroom.type";
import { Course } from "@/types/course.type";
import { Student, Teacher } from "@/types/user.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type AssignCourse = {
    classroom: Classroom | null;
    course: Course | null;
    teacher: Teacher | null;
};
type EnrollStudent = {
    classroom: Classroom | null;
    student: Student | null;
};

type ModalStateType = {
    modalEnrollStudent: boolean;
    modalAssignCourse: boolean;
    modalAssignTeacher: boolean;
    modalFormAssignTeacherAndCourse: boolean;
    modalFormEnrollStudent: boolean;
    modalUpdateEnrollStudent: boolean;
};

type ClassroomIdStateType = {
    modalState: ModalStateType;
    assignCourse: AssignCourse;
    enrollStudent: EnrollStudent;
    dataStateUpdateEnrollStudent: Partial<ClassroomStudent>;
};

const initialState: ClassroomIdStateType = {
    modalState: {
        modalEnrollStudent: false,
        modalAssignCourse: false,
        modalAssignTeacher: false,
        modalFormAssignTeacherAndCourse: false,
        modalFormEnrollStudent: false,
        modalUpdateEnrollStudent: false,
    },
    assignCourse: {
        classroom: null,
        course: null,
        teacher: null,
    },
    enrollStudent: {
        classroom: null,
        student: null,
    },
    dataStateUpdateEnrollStudent: {},
};

export const ClassroomIdSlice = createSlice({
    name: "classroomId",
    initialState,
    reducers: {
        setModalState: (
            state,
            action: PayloadAction<{ value: Partial<ModalStateType> }>
        ) => {
            state.modalState = { ...state.modalState, ...action.payload.value };
        },
        setAssignCourse: (
            state,
            action: PayloadAction<{ value: Partial<AssignCourse> }>
        ) => {
            state.assignCourse = {
                ...state.assignCourse,
                ...action.payload.value,
            };
        },
        resetAssignCourse: (state) => {
            state.assignCourse = initialState.assignCourse;
        },
        setEnrollStudent: (
            state,
            action: PayloadAction<{ value: Partial<EnrollStudent> }>
        ) => {
            state.enrollStudent = {
                ...state.enrollStudent,
                ...action.payload.value,
            };
        },
        resetEnrollStudent: (state) => {
            state.enrollStudent = initialState.enrollStudent;
        },

        setDataStateUpdateEnrollStudent: (
            state,
            action: PayloadAction<{ value: ClassroomStudent }>
        ) => {
            state.dataStateUpdateEnrollStudent = action.payload.value;
        },
    },
});

export default ClassroomIdSlice;

export const {
    setModalState,
    setAssignCourse,
    resetAssignCourse,
    setEnrollStudent,
    resetEnrollStudent,
    setDataStateUpdateEnrollStudent,
} = ClassroomIdSlice.actions;
