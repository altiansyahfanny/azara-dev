import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { StudentFilterType } from '../../types/user.type';
import { PaginationType } from '@/types/table.type';

type ModalType = {
	modalAddIsOpen: boolean;
	modalUpdateIsOpen: boolean;
};

type StudentStateType = {
	modalState: ModalType;
	paginationState: PaginationType;
	filterState: StudentFilterType;
};

const initialState: StudentStateType = {
	filterState: { firstName: '', email: '', lastName: '' },
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
		setPaginationState: (state, action: PayloadAction<{ value: Partial<PaginationType> }>) => {
			state.paginationState = { ...state.paginationState, ...action.payload.value };
		},

		setFilterState: (state, action: PayloadAction<{ value: Partial<StudentFilterType> }>) => {
			state.filterState = { ...state.filterState, ...action.payload.value };
		},
	},
});

export default StudentSlice;

export const { setFilterState, setPaginationState } = StudentSlice.actions;
