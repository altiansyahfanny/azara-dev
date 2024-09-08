import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import AuthSlice from './features/authSlice';
import UserSlice from './features/userSlice';
import { apiSlice } from '@/api/api';
import StudentSlice from './features/studentSlice';
import CourseSlice from './features/courseSlice';
import CycleSlice from './features/cycleSlice';
import ClassroomSlice from './features/classroomSlice';
import ClassroomIdSlice from './features/classroomIdSlice';
import TeacherSlice from './features/teacherSlice';
import MeetingSlice from './features/meetingSlice';
import AttendanceSlice from './features/attendanceSlice';
import PaymnentSlice from './features/paymentSlice';
import PaymentHistorySlice from './features/paymentHistorySlice';
import PaymentListSlice from './features/paymentListSlice';
import StudentPaymentSlice from './features/studentPaymentSlice';
import StudentPaymentListSlice from './features/studentPaymentListSlice';
import StudentPaymentHistorySlice from './features/studentPaymentHistorySlice';

export const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		auth: AuthSlice.reducer,
		user: UserSlice.reducer,
		student: StudentSlice.reducer,
		[TeacherSlice.name]: TeacherSlice.reducer,
		course: CourseSlice.reducer,
		cycle: CycleSlice.reducer,
		classroom: ClassroomSlice.reducer,
		[ClassroomIdSlice.name]: ClassroomIdSlice.reducer,
		[MeetingSlice.name]: MeetingSlice.reducer,
		[AttendanceSlice.name]: AttendanceSlice.reducer,
		[PaymnentSlice.name]: PaymnentSlice.reducer,
		[PaymentListSlice.name]: PaymentListSlice.reducer,
		[PaymentHistorySlice.name]: PaymentHistorySlice.reducer,

		[StudentPaymentSlice.name]: StudentPaymentSlice.reducer,
		[StudentPaymentListSlice.name]: StudentPaymentListSlice.reducer,
		[StudentPaymentHistorySlice.name]: StudentPaymentHistorySlice.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
