import { Classroom, ClassroomCourse, ClassroomStudent } from '@/types/classroom.type';
import { Course } from '@/types/course.type';
import { Student, Teacher } from '@/types/user.type';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

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
	modalUpdateAssignTeacherCourse: boolean;
	alertDeleteAssignTeacherCourse: boolean;
	alertDeleteEnrollStudent: boolean;
};

type ClassroomIdStateType = {
	modalState: ModalStateType;
	assignCourse: AssignCourse;
	enrollStudent: EnrollStudent;
	dataStateUpdateEnrollStudent: Partial<ClassroomStudent>;
	dataStateAssignTeacherCourse: Partial<ClassroomCourse>;
};

const initialState: ClassroomIdStateType = {
	modalState: {
		modalEnrollStudent: false,
		modalAssignCourse: false,
		modalAssignTeacher: false,
		modalFormAssignTeacherAndCourse: false,
		modalFormEnrollStudent: false,
		modalUpdateEnrollStudent: false,
		modalUpdateAssignTeacherCourse: false,
		alertDeleteEnrollStudent: false,
		alertDeleteAssignTeacherCourse: false,
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
	dataStateAssignTeacherCourse: {},
};

export const ClassroomIdSlice = createSlice({
	name: 'classroomId',
	initialState,
	reducers: {
		setModalState: (state, action: PayloadAction<{ value: Partial<ModalStateType> }>) => {
			state.modalState = { ...state.modalState, ...action.payload.value };
		},
		setAssignCourse: (state, action: PayloadAction<{ value: Partial<AssignCourse> }>) => {
			state.assignCourse = {
				...state.assignCourse,
				...action.payload.value,
			};
		},
		resetAssignCourse: (state) => {
			state.assignCourse = initialState.assignCourse;
		},
		setEnrollStudent: (state, action: PayloadAction<{ value: Partial<EnrollStudent> }>) => {
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
		setDataStateAssignTeacherCourse: (state, action: PayloadAction<{ value: ClassroomCourse }>) => {
			state.dataStateAssignTeacherCourse = action.payload.value;
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
	setDataStateAssignTeacherCourse,
} = ClassroomIdSlice.actions;
