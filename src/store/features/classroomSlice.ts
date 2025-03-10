import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Pagination } from '@/types/table.type';
import { Classroom, ClassroomFilter } from '@/types/classroom.type';

type ModalStateType = {
	modalCreate: boolean;
	modalUpdate: boolean;
};

type ClassroomStateType = {
	modalState: ModalStateType;
	paginationState: Pagination;
	filterState: ClassroomFilter;
	dataState: Classroom;
};

const initialState: ClassroomStateType = {
	filterState: {},
	paginationState: { page: 1, total: 10, pageSize: 10 },

	modalState: {
		modalCreate: false,
		modalUpdate: false,
	},

	dataState: {
		id: 0,
		classroomName: '',
		cycleDescription: '',
		price: 0,
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

		setDataState: (state, action: PayloadAction<{ value: Classroom }>) => {
			state.dataState = action.payload.value;
		},
	},
});

export default ClassroomSlice;

export const { setFilterState, setPaginationState, setModalState, setDataState } =
	ClassroomSlice.actions;
