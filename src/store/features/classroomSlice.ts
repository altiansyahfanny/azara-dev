import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Pagination, SortDirection, Sorting } from "@/types/table.type";
import { Classroom, ClassroomFilter } from "@/types/classroom.type";

type ModalStateType = {
    modalCreate: boolean;
    modalUpdate: boolean;
};

type ClassroomStateType = {
    modalState: ModalStateType;
    paginationState: Pagination;
    filterState: ClassroomFilter;
    sortingState: Sorting;
    dataState: Partial<Classroom>;
};

const initialState: ClassroomStateType = {
    filterState: {},
    paginationState: { page: 1, totalPage: 1, pageSize: 10 },
    sortingState: {},

    modalState: {
        modalCreate: false,
        modalUpdate: false,
    },

    dataState: {},
};

export const ClassroomSlice = createSlice({
    name: "classroom",
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
            action: PayloadAction<{ value: Partial<ClassroomFilter> }>
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

        setDataState: (state, action: PayloadAction<{ value: Classroom }>) => {
            state.dataState = action.payload.value;
        },
    },
});

export default ClassroomSlice;

export const {
    setFilterState,
    setPaginationState,
    setModalState,
    setDataState,
    setSortingState,
} = ClassroomSlice.actions;
