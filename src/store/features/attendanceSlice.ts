import { MeetingAttendance } from "@/types/meetingId.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ModalStateType = {
    modalUpdate: boolean;
};

type AttendanceStateType = {
    modalState: ModalStateType;
    dataSources: MeetingAttendance[] | undefined;
};

const initialState: AttendanceStateType = {
    modalState: {
        modalUpdate: false,
    },
    dataSources: undefined,
};

export const AttendanceSlice = createSlice({
    name: "attendance",
    initialState,
    reducers: {
        setModalState: (
            state,
            action: PayloadAction<{ value: Partial<ModalStateType> }>
        ) => {
            state.modalState = { ...state.modalState, ...action.payload.value };
        },

        setDataSources: (
            state,
            action: PayloadAction<{ value: MeetingAttendance[] }>
        ) => {
            state.dataSources = action.payload.value;
        },
    },
});

export default AttendanceSlice;

export const {
    setModalState,
    setDataSources,
    //setDataState
} = AttendanceSlice.actions;
