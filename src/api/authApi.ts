import { ApiResponseType } from '@/types/api.type';
import { logOut, setAccessToken } from '../store/features/authSlice';
import { LoginResponse, LoginRequest } from '../types/auth.type';
import { apiSlice } from './api';

interface RefreshResponse {
	access_token: string;
	message: string;
}

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation<ApiResponseType<LoginResponse>, LoginRequest>({
			query: (credentials) => ({
				url: '/auth/login',
				method: 'POST',
				body: credentials,
			}),
		}),
		sendLogout: builder.mutation<any, void>({
			query: () => ({
				url: '/auth/logout',
				method: 'POST',
			}),
			async onQueryStarted(_arg, { dispatch }) {
				try {
					dispatch(logOut());
					setTimeout(() => {
						dispatch(apiSlice.util.resetApiState());
					}, 1000);
				} catch (err) {
					console.log('useSendLogoutMutation -> error : ', err);
				}
			},
		}),

		refresh: builder.mutation<RefreshResponse, void>({
			query: () => ({
				url: '/auth/refresh-token',
				method: 'GET',
			}),
			async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					console.log('useRefreshMutation -> Success : ', data.access_token);
					// const { accessToken } = data
					dispatch(setAccessToken({ value: data.access_token }));
				} catch (err) {
					console.log('useRefreshMutation -> Error : ', err);
				}
			},
		}),
	}),
});

export const { useLoginMutation, useSendLogoutMutation, useRefreshMutation } = authApiSlice;
