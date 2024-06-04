import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type ModalStateType = {
	modalEnrollStudent: boolean;
	modalAssignCourse: boolean;
};

type ClassroomIdStateType = {
	modalState: ModalStateType;
};

const initialState: ClassroomIdStateType = {
	modalState: {
		modalEnrollStudent: false,
		modalAssignCourse: false,
	},
};

export const ClassroomIdSlice = createSlice({
	name: 'classroomId',
	initialState,
	reducers: {
		setModalState: (state, action: PayloadAction<{ value: Partial<ModalStateType> }>) => {
			state.modalState = { ...state.modalState, ...action.payload.value };
		},
	},
});

export default ClassroomIdSlice;

export const { setModalState } = ClassroomIdSlice.actions;
