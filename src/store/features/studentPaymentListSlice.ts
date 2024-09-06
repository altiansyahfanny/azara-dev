import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pagination, SortDirection, Sorting } from '@/types/table.type';
import { StudentPayment, StudentPaymentFilter } from '@/types/stundentPayment.type';

type ModalStateType = {
	modalCreate: boolean;
	modalUpdate: boolean;
	modalFilter: boolean;
};

type StudentPaymentListStateType = {
	// defaultTab: string;
	modalState: ModalStateType;
	paginationState: Pagination;
	filterState: StudentPaymentFilter;
	sortingState: Sorting;
	dataState: Partial<StudentPayment>;
	dataStateCreate: Partial<StudentPayment>;
};

const initialState: StudentPaymentListStateType = {
	// defaultTab: 'list',
	filterState: {
		forPayment: true,
	},
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

export const StudentPaymentListSlice = createSlice({
	name: 'studentPaymentList',
	initialState,
	reducers: {
		setPaginationState: (state, action: PayloadAction<{ value: Partial<Pagination> }>) => {
			state.paginationState = {
				...state.paginationState,
				...action.payload.value,
			};
		},

		setFilterState: (state, action: PayloadAction<{ value: Partial<StudentPaymentFilter> }>) => {
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

		setDataState: (state, action: PayloadAction<{ value: StudentPayment }>) => {
			state.dataState = action.payload.value;
		},

		setDataCreateState: (state, action: PayloadAction<{ value: StudentPayment }>) => {
			state.dataStateCreate = action.payload.value;
		},
	},
});

export default StudentPaymentListSlice;

export const {
	setFilterState,
	setPaginationState,
	setModalState,
	setDataState,
	setDataCreateState,
	setSortingState,
} = StudentPaymentListSlice.actions;
