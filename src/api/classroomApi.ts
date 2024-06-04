import { convertToQueryString } from '@/helpers/api-helper';
import { createClassroomSchema } from '@/schema/classroom';
import { setPaginationState } from '@/store/features/classroomSlice';
import { ApiResponseType, ParamsType } from '@/types/api.type';
import { ClassroomType, ClassroomsResponseType } from '@/types/classroom.type';
import { z } from 'zod';
import { apiSlice } from './api';

export const classroomApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getClassrooms: builder.query<
			ApiResponseType<ClassroomsResponseType>,
			ParamsType<ClassroomType>
		>({
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
		getClassroom: builder.query<ApiResponseType<ClassroomType>, string>({
			query: (id) => `/classroom/${id}`,
			// providesTags: ['Classrooms'],
		}),
		addClassroom: builder.mutation<ApiResponseType, z.infer<typeof createClassroomSchema>>({
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
