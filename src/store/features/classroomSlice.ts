import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Pagination } from '@/types/table.type';
import { ClassroomFilter } from '@/types/classroom.type';

type ModalStateType = {
	modalCreate: boolean;
};

type ClassroomStateType = {
	modalState: ModalStateType;
	paginationState: Pagination;
	filterState: ClassroomFilter;
};

const initialState: ClassroomStateType = {
	filterState: { classroomName: '', description: '' },
	paginationState: { page: 1, total: 10, pageSize: 10 },

	modalState: {
		modalCreate: false,
	},
};

export const ClassroomSlice = createSlice({
	name: 'classroom',
	initialState,
	reducers: {
		setPaginationState: (state, action: PayloadAction<{ value: Partial<Pagination> }>) => {
			state.paginationState = { ...state.paginationState, ...action.payload.value };
		},

		setFilterState: (state, action: PayloadAction<{ value: Partial<ClassroomFilter> }>) => {
			state.filterState = { ...state.filterState, ...action.payload.value };
		},

		setModalState: (state, action: PayloadAction<{ value: Partial<ModalStateType> }>) => {
			state.modalState = { ...state.modalState, ...action.payload.value };
		},
	},
});

export default ClassroomSlice;

export const { setFilterState, setPaginationState, setModalState } = ClassroomSlice.actions;
