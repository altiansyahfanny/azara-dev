import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PaginationType } from '@/types/table.type';
import { ClassroomFilterType } from '@/types/classroom.type';

type ModalStateType = {
	modalCreate: boolean;
};

type ClassroomStateType = {
	modalState: ModalStateType;
	paginationState: PaginationType;
	filterState: ClassroomFilterType;
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
		setPaginationState: (state, action: PayloadAction<{ value: Partial<PaginationType> }>) => {
			state.paginationState = { ...state.paginationState, ...action.payload.value };
		},

		setFilterState: (state, action: PayloadAction<{ value: Partial<ClassroomFilterType> }>) => {
			state.filterState = { ...state.filterState, ...action.payload.value };
		},

		setModalState: (state, action: PayloadAction<{ value: Partial<ModalStateType> }>) => {
			state.modalState = { ...state.modalState, ...action.payload.value };
		},
	},
});

export default ClassroomSlice;

export const { setFilterState, setPaginationState, setModalState } = ClassroomSlice.actions;
