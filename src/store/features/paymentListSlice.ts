import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Pagination, SortDirection, Sorting } from '@/types/table.type';
import { Payment, PaymentFilter } from '@/types/payment.type';

type ModalStateType = {
	modalCreate: boolean;
	modalUpdate: boolean;
	modalFilter: boolean;
};

type PaymentListStateType = {
	modalState: ModalStateType;
	paginationState: Pagination;
	filterState: PaymentFilter;
	sortingState: Sorting;
	dataState: Partial<Payment>;
	dataStateCreate: Partial<Payment>;
};

const initialState: PaymentListStateType = {
	filterState: {},
	paginationState: { page: 1, totalPage: 1, pageSize: 10 },
	sortingState: {},

	modalState: {
		modalCreate: false,
		modalUpdate: false,
		modalFilter: false,
	},

	dataState: {},
	dataStateCreate: {},
};

export const PaymentListSlice = createSlice({
	name: 'paymentList',
	initialState,
	reducers: {
		setPaginationState: (state, action: PayloadAction<{ value: Partial<Pagination> }>) => {
			state.paginationState = {
				...state.paginationState,
				...action.payload.value,
			};
		},

		setFilterState: (state, action: PayloadAction<{ value: Partial<PaymentFilter> }>) => {
			state.filterState = {
				...state.filterState,
				...action.payload.value,
			};
		},

		setSortingState: (
			state,
			action: PayloadAction<{
				value: {
					// sort: keyof StudentFilter;
					sort: string;
					sortDirection: SortDirection;
				};
			}>
		) => {
			state.sortingState = {
				sort: action.payload.value.sort,
				sortDirection: action.payload.value.sortDirection,
			};
		},

		setModalState: (state, action: PayloadAction<{ value: Partial<ModalStateType> }>) => {
			state.modalState = { ...state.modalState, ...action.payload.value };
		},

		setDataState: (state, action: PayloadAction<{ value: Payment }>) => {
			state.dataState = action.payload.value;
		},

		setDataCreateState: (state, action: PayloadAction<{ value: Payment }>) => {
			state.dataStateCreate = action.payload.value;
		},
	},
});

export default PaymentListSlice;

export const {
	setFilterState,
	setPaginationState,
	setModalState,
	setDataState,
	setDataCreateState,
	setSortingState,
} = PaymentListSlice.actions;
