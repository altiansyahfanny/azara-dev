import { ApiResponse, QueryParam } from '@/types/api.type';
import { apiSlice } from './api';
import { TeachersResponse, User } from '@/types/user.type';
import { convertToQueryString } from '@/helpers/api-helper';
import { setPaginationState } from '@/store/features/teacherSlice';

export const UserApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getTeachers: builder.query<ApiResponse<TeachersResponse>, QueryParam<User>>({
			query: (q) => `/teacher?${convertToQueryString(q)}`,
			async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					console.log('useGetTeachersQuery -> Success : ', data.data);
					dispatch(setPaginationState({ value: { total: data.data.pagination.totalData } }));
				} catch (err) {
					console.log('useGetTeachersQuery -> Error : ', err);
				}
			},
			providesTags: ['Teachers'],
		}),
	}),
});

export const {
	useGetTeachersQuery,
	// useAddUserMutation, useGetUserQuery, useGetUserProfileQuery
} = UserApiSlice;
