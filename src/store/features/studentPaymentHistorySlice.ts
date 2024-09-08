import { StudentPaymentHistory, StudentPaymentHistoryFilter } from '@/types/stundentPayment.type';
import { Pagination, SortDirection, Sorting } from '@/types/table.type';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type ModalStateType = {
	modalUpdate: boolean;
	alertDelete: boolean;
};

type StudentPaymentHistoryStateType = {
	modalState: ModalStateType;
	paginationState: Pagination;
	filterState: StudentPaymentHistoryFilter;
	sortingState: Sorting;
	dataStateUpdate: Partial<StudentPaymentHistory>;
};

const initialState: StudentPaymentHistoryStateType = {
	filterState: {},
	paginationState: { page: 1, totalPage: 1, pageSize: 10 },
	sortingState: {},
	modalState: {
		alertDelete: false,
		modalUpdate: false,
	},
	dataStateUpdate: {},
};

export const StudentPaymentHistorySlice = createSlice({
	name: 'studentPaymentHistory',
	initialState,
	reducers: {
		setPaginationState: (state, action: PayloadAction<{ value: Partial<Pagination> }>) => {
			state.paginationState = {
				...state.paginationState,
				...action.payload.value,
			};
		},

		setFilterState: (
			state,
			action: PayloadAction<{ value: Partial<StudentPaymentHistoryFilter> }>
		) => {
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

		setDataUpdateState: (state, action: PayloadAction<{ value: StudentPaymentHistory }>) => {
			state.dataStateUpdate = action.payload.value;
		},
	},
});

export default StudentPaymentHistorySlice;

export const {
	setFilterState,
	setPaginationState,
	setModalState,
	setDataUpdateState,
	setSortingState,
} = StudentPaymentHistorySlice.actions;
