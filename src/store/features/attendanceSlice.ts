import { MeetingAttendance, MeetingStudent } from '@/types/meetingId.type';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type ModalStateType = {
	modalUpdate: boolean;
	modalCreate: boolean;
	alartDelete: boolean;
};

export type AttendanceStatusType = 'present' | 'absent' | 'left' | 'unregistered';

export type DataSourcesCreateType =
	| (MeetingStudent & { status: AttendanceStatusType })[]
	| undefined;

type AttendanceStateType = {
	modalState: ModalStateType;
	dataSourcesUpdate: MeetingAttendance[] | undefined;
	dataSourcesCreate: DataSourcesCreateType;
};

const initialState: AttendanceStateType = {
	modalState: {
		modalUpdate: false,
		modalCreate: false,
		alartDelete: false,
	},
	dataSourcesUpdate: undefined,
	dataSourcesCreate: undefined,
};

export const AttendanceSlice = createSlice({
	name: 'attendance',
	initialState,
	reducers: {
		setModalState: (state, action: PayloadAction<{ value: Partial<ModalStateType> }>) => {
			state.modalState = { ...state.modalState, ...action.payload.value };
		},

		setDataSourcesUpdate: (state, action: PayloadAction<{ value: MeetingAttendance[] }>) => {
			state.dataSourcesUpdate = action.payload.value;
		},

		setDataSourcesCreate: (
			state,
			action: PayloadAction<{
				value: DataSourcesCreateType;
			}>
		) => {
			state.dataSourcesCreate = action.payload.value;
		},
	},
});

export default AttendanceSlice;

export const {
	setModalState,
	setDataSourcesUpdate,
	//setDataState
	setDataSourcesCreate,
} = AttendanceSlice.actions;
