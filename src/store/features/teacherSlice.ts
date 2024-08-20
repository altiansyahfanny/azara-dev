import { Pagination, Sorting } from "@/types/table.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Teacher, TeacherFilter, TeacherSorting } from "../../types/user.type";

type ModalStateType = {
    modalUpdate: boolean;
};

type TeacherStateType = {
    modalState: ModalStateType;
    paginationState: Pagination;
    filterState: TeacherFilter;
    sortingState: TeacherSorting;
    dataState: Partial<Teacher>;
};

const initialState: TeacherStateType = {
    filterState: {},
    sortingState: {},
    paginationState: { page: 1, pageSize: 10, totalPage: 1 },

    modalState: {
        modalUpdate: false,
    },

    dataState: {},
};

export const TeacherSlice = createSlice({
    name: "teacher",
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
            action: PayloadAction<{ value: Partial<TeacherFilter> }>
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
            action: PayloadAction<{ value: Partial<Teacher> }>
        ) => {
            state.dataState = action.payload.value;
        },
    },
});

export default TeacherSlice;

export const {
    setFilterState,
    setPaginationState,
    setDataState,
    setModalState,
    setSortingState,
} = TeacherSlice.actions;
