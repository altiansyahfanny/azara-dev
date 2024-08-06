import { z } from 'zod';
import { apiSlice } from './api';
import { createUserSchema } from '@/schema/user';
import { ApiResponse } from '@/types/api.type';
import { UserDetail } from '@/types/user.type';
import { setDataPictureState } from '@/store/features/userSlice';

export const userApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		addUser: builder.mutation<ApiResponse, z.infer<typeof createUserSchema>>({
			query: (payload) => ({
				url: '/auth/register',
				method: 'POST',
				body: payload,
			}),
			invalidatesTags: ['Students'],
		}),
		getUserDetail: builder.query<ApiResponse<UserDetail>, void>({
			query: () => ({
				url: '/user',
				method: 'GET',
			}),

			async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					console.log('getUserDetail -> Success : ', data.data.imageUrl);
					// const { accessToken } = data
					dispatch(setDataPictureState({ value: data.data.imageUrl }));
				} catch (err) {
					console.log('getUserDetail -> Error : ', err);
				}
			},

			providesTags: ['User'],
		}),
		changeImage: builder.mutation<ApiResponse, any>({
			query: (payload) => ({
				url: '/user/image',
				method: 'PATCH',
				body: payload,
			}),
			invalidatesTags: ['User'],
		}),
	}),
});

export const { useAddUserMutation, useGetUserDetailQuery, useChangeImageMutation } = userApiSlice;
