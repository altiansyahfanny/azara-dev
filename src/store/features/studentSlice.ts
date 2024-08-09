import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Student, StudentFilter } from '../../types/user.type';
import { Pagination } from '@/types/table.type';

type ModalStateType = {
	modalAddIsOpen: boolean;
	modalUpdate: boolean;
};

type StudentStateType = {
	modalState: ModalStateType;
	paginationState: Pagination;
	filterState: StudentFilter;
	dataState: Partial<Student>
};

const initialState: StudentStateType = {
	filterState: {},
	paginationState: { page: 1, total: 10, pageSize: 10 },

	modalState: {
		modalAddIsOpen: false,
		modalUpdate: false,
	},
	dataState: {}
};

export const StudentSlice = createSlice({
	name: 'student',
	initialState,
	reducers: {
		setPaginationState: (state, action: PayloadAction<{ value: Partial<Pagination> }>) => {
			state.paginationState = { ...state.paginationState, ...action.payload.value };
		},

		setFilterState: (state, action: PayloadAction<{ value: Partial<StudentFilter> }>) => {
			state.filterState = { ...state.filterState, ...action.payload.value };
		},

		setModalState: (state, action: PayloadAction<{ value: Partial<ModalStateType> }>) => {
			state.modalState = { ...state.modalState, ...action.payload.value };
		},

		setDataState: (state, action: PayloadAction<{ value: Partial<Student> }>) => {
			state.dataState = action.payload.value;
		},
	},
});

export default StudentSlice;

export const { setFilterState, setPaginationState, setDataState , setModalState} = StudentSlice.actions;
