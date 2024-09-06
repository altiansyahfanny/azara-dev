import { createSlice } from '@reduxjs/toolkit';

type StudentPaymentHistoryStateType = {
	// defaultTab: string;
};

const initialState: StudentPaymentHistoryStateType = {
	// defaultTab: 'list',
};

export const StudentPaymentHistorySlice = createSlice({
	name: 'studentPaymentHistory',
	initialState,
	reducers: {},
});

export default StudentPaymentHistorySlice;

export const {} = StudentPaymentHistorySlice.actions;
