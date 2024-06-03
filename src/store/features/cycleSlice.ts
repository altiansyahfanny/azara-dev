import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { StudentFilterType } from '../../types/user.type';
import { PaginationType } from '@/types/table.type';
import { CycleFilterType } from '@/types/cycle.type';

type ModalStateType = {
	modalCreate: boolean;
};

type CycleStateType = {
	modalState: ModalStateType;
	paginationState: PaginationType;
	filterState: CycleFilterType;
};

const initialState: CycleStateType = {
	filterState: { startDate: '', endDate: '', description: '' },
	paginationState: { page: 1, total: 10, pageSize: 10 },

	modalState: {
		modalCreate: false,
	},
};

export const CycleSlice = createSlice({
	name: 'cycle',
	initialState,
	reducers: {
		setPaginationState: (state, action: PayloadAction<{ value: Partial<PaginationType> }>) => {
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

export default CycleSlice;

export const { setFilterState, setPaginationState, setModalState } = CycleSlice.actions;
