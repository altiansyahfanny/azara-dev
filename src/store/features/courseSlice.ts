import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Pagination, SortDirection, Sorting } from "@/types/table.type";
import { Course, CourseFilter } from "@/types/course.type";

type ModalStateType = {
    modalCreate: boolean;
    modalUpdate: boolean;
};

type CourseStateType = {
    modalState: ModalStateType;
    paginationState: Pagination;
    filterState: CourseFilter;
    sortingState: Sorting;
    dataState: Partial<Course>;
};

const initialState: CourseStateType = {
    filterState: {},
    paginationState: { page: 1, totalPage: 1, pageSize: 10 },
    sortingState: {},

    modalState: {
        modalCreate: false,
        modalUpdate: false,
    },

    dataState: {},
};

export const CourseSlice = createSlice({
    name: "course",
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
            action: PayloadAction<{ value: Partial<CourseFilter> }>
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

        setDataState: (state, action: PayloadAction<{ value: Course }>) => {
            state.dataState = action.payload.value;
        },
    },
});

export default CourseSlice;

export const {
    setFilterState,
    setPaginationState,
    setModalState,
    setDataState,
    setSortingState,
} = CourseSlice.actions;
