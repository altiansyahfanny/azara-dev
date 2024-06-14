import { ApiResponse, QueryParam } from '@/types/api.type';
import { apiSlice } from './api';
import { StudentFilter, StudentsResponse } from '@/types/user.type';
import { convertToQueryString } from '@/helpers/api-helper';
import { setPaginationState } from '@/store/features/studentSlice';

export const UserApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getStudents: builder.query<ApiResponse<StudentsResponse>, QueryParam<StudentFilter>>({
			query: (q) => `/student?${convertToQueryString(q)}`,
			async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					console.log('useGetStudentsQuery -> Success : ', data.data);
					dispatch(setPaginationState({ value: { total: data.data.pagination.totalData } }));
				} catch (err) {
					console.log('useGetStudentsQuery -> Error : ', err);
				}
			},
			providesTags: ['Students'],
		}),
	}),
});

export const {
	useGetStudentsQuery,
	// useAddUserMutation, useGetUserQuery, useGetUserProfileQuery
} = UserApiSlice;
