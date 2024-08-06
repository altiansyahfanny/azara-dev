import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Pagination } from '@/types/table.type';
import { Meeting, MeetingFilter } from '@/types/meeting.type';

type ModalStateType = {
	modalCreate: boolean;
	modalUpdate: boolean;
};

type MeetingStateType = {
	modalState: ModalStateType;
	paginationState: Pagination;
	filterState: MeetingFilter;
	dataState: Partial<Meeting>;
};

const initialState: MeetingStateType = {
	filterState: {
		isVerified: false,
	},
	paginationState: { page: 1, total: 10, pageSize: 10 },

	modalState: {
		modalCreate: false,
		modalUpdate: false,
	},

	dataState: {},
};

export const MeetingSlice = createSlice({
	name: 'meeting',
	initialState,
	reducers: {
		setPaginationState: (state, action: PayloadAction<{ value: Partial<Pagination> }>) => {
			state.paginationState = { ...state.paginationState, ...action.payload.value };
		},

		setFilterState: (state, action: PayloadAction<{ value: MeetingFilter }>) => {
			state.filterState = action.payload.value;
		},

		setModalState: (state, action: PayloadAction<{ value: Partial<ModalStateType> }>) => {
			state.modalState = { ...state.modalState, ...action.payload.value };
		},

		setDataState: (state, action: PayloadAction<{ value: Meeting }>) => {
			state.dataState = action.payload.value;
		},
	},
});

export default MeetingSlice;

export const { setFilterState, setPaginationState, setModalState, setDataState } =
	MeetingSlice.actions;
