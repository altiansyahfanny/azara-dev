import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type ModalStateType = {
	modalCreate: boolean;
};

type AuthStateType = {
	modalState: ModalStateType;
};

const initialState: AuthStateType = {
	modalState: {
		modalCreate: false,
	},
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
	},
});

export default UserSlice;

export const { setState, setModalState } = UserSlice.actions;
