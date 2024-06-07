import { Pagination } from '@/types/table.type';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type ModalStateType = {
	modalCreate: boolean;
};

type AuthStateType = {
	modalState: ModalStateType;
	paginationState: Pagination;
};

const initialState: AuthStateType = {
	modalState: {
		modalCreate: false,
	},
	paginationState: { page: 1, total: 10, pageSize: 10 },
};

export const UserSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setState: (state, action: PayloadAction<{ value: Partial<AuthStateType> }>) => {
			state = { ...state, ...action.payload.value };
		},
		setModalState: (state, action: PayloadAction<{ value: Partial<ModalStateType> }>) => {
			state.modalState = { ...state.modalState, ...action.payload.value };
		},
		setPaginationState: (state, action: PayloadAction<{ value: Partial<Pagination> }>) => {
			state.paginationState = { ...state.paginationState, ...action.payload.value };
		},
	},
});

export default UserSlice;

export const { setState, setModalState, setPaginationState } = UserSlice.actions;
