import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Student, StudentFilter, StudentSorting } from "../../types/user.type";
import { Pagination, Sorting } from "@/types/table.type";

type ModalStateType = {
    modalAddIsOpen: boolean;
    modalUpdate: boolean;
};

type StudentStateType = {
    modalState: ModalStateType;
    paginationState: Pagination;
    filterState: StudentFilter;
    sortingState: StudentSorting;
    dataState: Partial<Student>;
};

const initialState: StudentStateType = {
    filterState: {},
    sortingState: {},
    paginationState: { page: 1, totalPage: 1, pageSize: 10 },

    modalState: {
        modalAddIsOpen: false,
        modalUpdate: false,
    },
    dataState: {},
};

export const StudentSlice = createSlice({
    name: "student",
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
            action: PayloadAction<{ value: Partial<StudentFilter> }>
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
                    sortDirection: Sorting;
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

        setDataState: (
            state,
            action: PayloadAction<{ value: Partial<Student> }>
        ) => {
            state.dataState = action.payload.value;
        },
    },
});

export default StudentSlice;

export const {
    setFilterState,
    setPaginationState,
    setDataState,
    setModalState,
    setSortingState,
} = StudentSlice.actions;
