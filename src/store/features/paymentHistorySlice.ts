import { PaymentHistory, PaymentHistoryFilter } from "@/types/payment.type";
import { Pagination } from "@/types/table.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ModalStateType = {
    modalUpdate: boolean;
    alertDelete: boolean;
};

type PaymentHistoryStateType = {
    modalState: ModalStateType;
    paginationState: Pagination;
    filterState: PaymentHistoryFilter;
    dataStateUpdate: Partial<PaymentHistory>;
};

const initialState: PaymentHistoryStateType = {
    modalState: {
        alertDelete: false,
        modalUpdate: false,
    },
    filterState: {},
    paginationState: { page: 1, totalPage: 1, pageSize: 10 },
    dataStateUpdate: {},
};

export const PaymentHistorySlice = createSlice({
    name: "paymentHistory",
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
            action: PayloadAction<{ value: Partial<PaymentHistoryFilter> }>
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

        setDataUpdateState: (
            state,
            action: PayloadAction<{ value: PaymentHistory }>
        ) => {
            state.dataStateUpdate = action.payload.value;
        },
    },
});

export default PaymentHistorySlice;

export const {
    setFilterState,
    setPaginationState,
    setModalState,
    setDataUpdateState,
} = PaymentHistorySlice.actions;
