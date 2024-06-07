import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TeacherFilterType } from '../../types/user.type';
import { Pagination } from '@/types/table.type';

type ModalType = {
	modalAddIsOpen: boolean;
	modalUpdateIsOpen: boolean;
};

type TeacherStateType = {
	modalState: ModalType;
	paginationState: Pagination;
	filterState: TeacherFilterType;
};

const initialState: TeacherStateType = {
	filterState: { firstName: '', email: '', lastName: '' },
	paginationState: { page: 1, total: 10, pageSize: 10 },

	modalState: {
		modalAddIsOpen: false,
		modalUpdateIsOpen: false,
	},
};

export const TeacherSlice = createSlice({
	name: 'teacher',
	initialState,
	reducers: {
		setPaginationState: (state, action: PayloadAction<{ value: Partial<Pagination> }>) => {
			state.paginationState = { ...state.paginationState, ...action.payload.value };
		},

		setFilterState: (state, action: PayloadAction<{ value: Partial<TeacherFilterType> }>) => {
			state.filterState = { ...state.filterState, ...action.payload.value };
		},
	},
});

export default TeacherSlice;

export const { setFilterState, setPaginationState } = TeacherSlice.actions;
