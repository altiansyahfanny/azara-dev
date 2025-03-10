import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Pagination } from '@/types/table.type';
import { CourseFilter } from '@/types/course.type';

type ModalStateType = {
	modalCreate: boolean;
	modalFilter: boolean;
};

type CourseStateType = {
	modalState: ModalStateType;
	paginationState: Pagination;
	filterState: CourseFilter;
};

const initialState: CourseStateType = {
	filterState: {},
	paginationState: { page: 1, total: 10, pageSize: 10 },

	modalState: {
		modalCreate: false,
		modalFilter: false,
	},
};

export const CourseSlice = createSlice({
	name: 'course',
	initialState,
	reducers: {
		setPaginationState: (state, action: PayloadAction<{ value: Partial<Pagination> }>) => {
			state.paginationState = { ...state.paginationState, ...action.payload.value };
		},

		setFilterState: (state, action: PayloadAction<{ value: Partial<CourseFilter> }>) => {
			state.filterState = { ...state.filterState, ...action.payload.value };
		},

		setModalState: (state, action: PayloadAction<{ value: Partial<ModalStateType> }>) => {
			state.modalState = { ...state.modalState, ...action.payload.value };
		},
	},
});

export default CourseSlice;

export const { setFilterState, setPaginationState, setModalState } = CourseSlice.actions;
