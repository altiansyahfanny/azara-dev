import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Pagination } from "@/types/table.type";
import { Payment, PaymentFilter } from "@/types/payment.type";

type ModalStateType = {
    modalCreate: boolean;
    modalUpdate: boolean;
};

type PaymentStateType = {
    modalState: ModalStateType;
    paginationState: Pagination;
    filterState: PaymentFilter;
    dataState: Partial<Payment>;
};

const initialState: PaymentStateType = {
    filterState: {},
    paginationState: { page: 1, totalPage: 1, pageSize: 10 },

    modalState: {
        modalCreate: false,
        modalUpdate: false,
    },

    dataState: {},
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

        setModalState: (
            state,
            action: PayloadAction<{ value: Partial<ModalStateType> }>
        ) => {
            state.modalState = { ...state.modalState, ...action.payload.value };
        },

        setDataState: (state, action: PayloadAction<{ value: Payment }>) => {
            state.dataState = action.payload.value;
        },
    },
});

export default PaymentSlice;

export const {
    setFilterState,
    setPaginationState,
    setModalState,
    setDataState,
} = PaymentSlice.actions;
