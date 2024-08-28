import { DummyProfile } from "@/assets/landing/img";
import { UserDetail } from "@/types/user.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ModalStateType = {
    modalCreate: boolean;
    modalUpdate: boolean;
    modalUpdatePicture: boolean;
    modalChangePassword: boolean;
    modalDetailEvent: boolean;
};

type AuthStateType = {
    modalState: ModalStateType;
    dataPictureState: string;
    dataState: Partial<UserDetail>;
    defaultTab: "student" | "teacher";
};

const initialState: AuthStateType = {
    modalState: {
        modalCreate: false,
        modalUpdatePicture: false,
        modalUpdate: false,
        modalChangePassword: false,
        modalDetailEvent: false,
    },
    dataPictureState: DummyProfile,
    dataState: {},
    defaultTab: "student",
};

export const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setState: (
            state,
            action: PayloadAction<{ value: Partial<AuthStateType> }>
        ) => {
            state = { ...state, ...action.payload.value };
        },
        setModalState: (
            state,
            action: PayloadAction<{ value: Partial<ModalStateType> }>
        ) => {
            state.modalState = { ...state.modalState, ...action.payload.value };
        },
        setDataPictureState: (
            state,
            action: PayloadAction<{ value: string }>
        ) => {
            state.dataPictureState = action.payload.value;
        },
        setDataState: (
            state,
            action: PayloadAction<{ value: Partial<UserDetail> }>
        ) => {
            state.dataState = action.payload.value;
        },
        setDefaulTabState: (
            state,
            action: PayloadAction<{ value: "student" | "teacher" }>
        ) => {
            state.defaultTab = action.payload.value;
        },
    },
});

export default UserSlice;

export const {
    setState,
    setModalState,
    setDataPictureState,
    setDataState,
    setDefaulTabState,
} = UserSlice.actions;
