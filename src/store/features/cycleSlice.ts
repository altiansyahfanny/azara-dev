import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Pagination } from "@/types/table.type";
import { Cycle, CycleFilter } from "@/types/cycle.type";

type ModalStateType = {
    modalCreate: boolean;
    modalUpdate: boolean;
};

type CycleStateType = {
    modalState: ModalStateType;
    paginationState: Pagination;
    filterState: CycleFilter;
    dataState: Partial<Cycle>;
};

const initialState: CycleStateType = {
    filterState: {},
    paginationState: { page: 1, totalPage: 1, pageSize: 10 },

    modalState: {
        modalCreate: false,
        modalUpdate: false,
    },

    dataState: {},
};

export const CycleSlice = createSlice({
    name: "cycle",
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
            action: PayloadAction<{ value: CycleFilter }>
        ) => {
            state.filterState = action.payload.value;
        },

        setModalState: (
            state,
            action: PayloadAction<{ value: Partial<ModalStateType> }>
        ) => {
            state.modalState = { ...state.modalState, ...action.payload.value };
        },

        setDataState: (state, action: PayloadAction<{ value: Cycle }>) => {
            state.dataState = action.payload.value;
        },
    },
});

export default CycleSlice;

export const {
    setFilterState,
    setPaginationState,
    setModalState,
    setDataState,
} = CycleSlice.actions;
