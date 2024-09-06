import { createSlice } from '@reduxjs/toolkit';

type PaymentStateType = {
	defaultTab: string;
};

const initialState: PaymentStateType = {
	defaultTab: 'list',
};

export const PaymentSlice = createSlice({
	name: 'payment',
	initialState,
	reducers: {},
});

export default PaymentSlice;

export const {} = PaymentSlice.actions;
