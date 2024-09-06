import { createSlice } from '@reduxjs/toolkit';

type PaymentStateType = {
	defaultTab: string;
};

const initialState: PaymentStateType = {
	defaultTab: 'list',
};

export const StudentPaymentSlice = createSlice({
	name: 'studentPayment',
	initialState,
	reducers: {},
});

export default StudentPaymentSlice;

export const {} = StudentPaymentSlice.actions;
