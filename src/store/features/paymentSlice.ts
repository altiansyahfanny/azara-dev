import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Pagination, SortDirection, Sorting } from "@/types/table.type";
import { Payment, PaymentFilter } from "@/types/payment.type";

type ModalStateType = {
    modalCreate: boolean;
    modalUpdate: boolean;
};

type PaymentStateType = {
    modalState: ModalStateType;
    paginationState: Pagination;
    filterState: PaymentFilter;
    sortingState: Sorting;
    dataState: Partial<Payment>;
    dataStateCreate: Partial<Payment>;
    defaultTab: string;
};

const initialState: PaymentStateType = {
    filterState: {},
    paginationState: { page: 1, totalPage: 1, pageSize: 10 },
    sortingState: {},

    modalState: {
        modalCreate: false,
        modalUpdate: false,
    },

    dataState: {},
    dataStateCreate: {},
    defaultTab: "list",
};

export const PaymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {
        setPaginationState: (
            state,
            action: PayloadAction<{ value: Partial<Pagination> }>
        ) => {
            state.paginationState = {
                ...state.paginationState,
                ...action.payload.value,
            };
        },

        setFilterState: (
            state,
            action: PayloadAction<{ value: Partial<PaymentFilter> }>
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

        setModalState: (
            state,
            action: PayloadAction<{ value: Partial<ModalStateType> }>
        ) => {
            state.modalState = { ...state.modalState, ...action.payload.value };
        },

        setDataState: (state, action: PayloadAction<{ value: Payment }>) => {
            state.dataState = action.payload.value;
        },

        setDataCreateState: (
            state,
            action: PayloadAction<{ value: Payment }>
        ) => {
            state.dataStateCreate = action.payload.value;
        },
    },
});

export default PaymentSlice;

export const {
    setFilterState,
    setPaginationState,
    setModalState,
    setDataState,
    setDataCreateState,
    setSortingState,
} = PaymentSlice.actions;
