import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import AuthSlice from './features/authSlice';
import UserSlice from './features/userSlice';
import { apiSlice } from '@/api/api';
import StudentSlice from './features/studentSlice';
import CourseSlice from './features/courseSlice';
import CycleSlice from './features/cycleSlice';

export const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		auth: AuthSlice.reducer,
		user: UserSlice.reducer,
		student: StudentSlice.reducer,
		course: CourseSlice.reducer,
		cycle: CycleSlice.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
