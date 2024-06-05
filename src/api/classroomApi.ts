import { convertToQueryString } from '@/helpers/api-helper';
import { createClassroomSchema } from '@/schema/classroom';
import { setPaginationState } from '@/store/features/classroomSlice';
import { ApiResponse, Query } from '@/types/api.type';
import { Classroom, ClassroomsResponse } from '@/types/classroom.type';
import { z } from 'zod';
import { apiSlice } from './api';

export const classroomApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getClassrooms: builder.query<ApiResponse<ClassroomsResponse>, Query<Classroom>>({
			query: (q) => `/classroom?${convertToQueryString(q)}`,
			async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					console.log('useGetClassroomsQuery -> Success : ', data.data.pagination);
					dispatch(setPaginationState({ value: { total: data.data.pagination.totalData } }));
				} catch (err) {
					console.log('useGetClassroomsQuery -> Error : ', err);
				}
			},
			providesTags: ['Classrooms'],
		}),
		getClassroom: builder.query<ApiResponse<Classroom>, string>({
			query: (id) => `/classroom/${id}`,
			// providesTags: ['Classrooms'],
		}),
		addClassroom: builder.mutation<ApiResponse, z.infer<typeof createClassroomSchema>>({
			query: (payload) => ({
				url: '/classroom/new',
				method: 'POST',
				body: payload,
			}),
			invalidatesTags: ['Classrooms'],
		}),
	}),
});

export const { useAddClassroomMutation, useGetClassroomsQuery, useGetClassroomQuery } =
	classroomApiSlice;
