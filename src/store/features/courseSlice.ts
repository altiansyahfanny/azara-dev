import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { StudentFilterType } from '../../types/user.type';
import { Pagination } from '@/types/table.type';
import { CourseFilter } from '@/types/course.type';

type ModalStateType = {
	modalCreate: boolean;
};

type CourseStateType = {
	modalState: ModalStateType;
	paginationState: Pagination;
	filterState: CourseFilter;
};

const initialState: CourseStateType = {
	filterState: { courseName: '', description: '' },
	paginationState: { page: 1, total: 10, pageSize: 10 },

	modalState: {
		modalCreate: false,
	},
};

export const CourseSlice = createSlice({
	name: 'course',
	initialState,
	reducers: {
		setPaginationState: (state, action: PayloadAction<{ value: Partial<Pagination> }>) => {
			state.paginationState = { ...state.paginationState, ...action.payload.value };
		},

		setFilterState: (state, action: PayloadAction<{ value: Partial<StudentFilterType> }>) => {
			state.filterState = { ...state.filterState, ...action.payload.value };
		},

		setModalState: (state, action: PayloadAction<{ value: Partial<ModalStateType> }>) => {
			state.modalState = { ...state.modalState, ...action.payload.value };
		},
	},
});

export default CourseSlice;

export const { setFilterState, setPaginationState, setModalState } = CourseSlice.actions;
