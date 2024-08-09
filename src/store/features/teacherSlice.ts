import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Teacher, TeacherFilter } from '../../types/user.type';
import { Pagination } from '@/types/table.type';

type ModalStateType = {
	modalUpdate: boolean;
};

type TeacherStateType = {
	modalState: ModalStateType;
	paginationState: Pagination;
	filterState: TeacherFilter;
	dataState:Partial<Teacher>
};

const initialState: TeacherStateType = {
	filterState: {},
	paginationState: { page: 1, total: 10, pageSize: 10 },

	modalState: {
		modalUpdate: false,
	},

	dataState: {}
};

export const TeacherSlice = createSlice({
	name: 'teacher',
	initialState,
	reducers: {
		setPaginationState: (state, action: PayloadAction<{ value: Partial<Pagination> }>) => {
			state.paginationState = { ...state.paginationState, ...action.payload.value };
		},

		setFilterState: (state, action: PayloadAction<{ value: Partial<TeacherFilter> }>) => {
			state.filterState = { ...state.filterState, ...action.payload.value };
		},

		setModalState: (state, action: PayloadAction<{ value: Partial<ModalStateType> }>) => {
			state.modalState = { ...state.modalState, ...action.payload.value };
		},

		setDataState: (state, action: PayloadAction<{ value: Partial<Teacher> }>) => {
			state.dataState = action.payload.value;
		},
	},
});

export default TeacherSlice;

export const { setFilterState, setPaginationState, setDataState, setModalState } = TeacherSlice.actions;
