import { z } from 'zod';
import { apiSlice } from './api';
import { createUserSchema } from '@/schema/user';
import { ApiResponse } from '@/types/api.type';
import { UserDetail } from '@/types/user.type';

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
			query: () => `/user`,
			// providesTags: ['Students'],
		}),
	}),
});

export const { useAddUserMutation, useGetUserDetailQuery } = userApiSlice;
