import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { StudentFilter } from '../../types/user.type';
import { Pagination } from '@/types/table.type';

type ModalType = {
	modalAddIsOpen: boolean;
	modalUpdateIsOpen: boolean;
};

type StudentStateType = {
	modalState: ModalType;
	paginationState: Pagination;
	filterState: StudentFilter;
};

const initialState: StudentStateType = {
	filterState: {},
	paginationState: { page: 1, total: 10, pageSize: 10 },

	modalState: {
		modalAddIsOpen: false,
		modalUpdateIsOpen: false,
	},
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
	},
});

export default StudentSlice;

export const { setFilterState, setPaginationState } = StudentSlice.actions;
