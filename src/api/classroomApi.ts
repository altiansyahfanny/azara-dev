import { convertToQueryString } from '@/helpers/api-helper';
import { createClassroomSchema } from '@/schema/classroom';
import { setPaginationState } from '@/store/features/classroomSlice';
import { ApiResponse, QueryParam } from '@/types/api.type';
import { Classroom, ClassroomId, ClassroomsResponse } from '@/types/classroom.type';
import { z } from 'zod';
import { apiSlice } from './api';
import { parseStringCurrencyToNumber } from '@/helpers/app-helper';
import { AssignTeacherAndCourseSchemaRequest, EnrollStudentRequest } from '@/model/classroom';

export const classroomApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getClassrooms: builder.query<ApiResponse<ClassroomsResponse>, QueryParam<Classroom>>({
			query: (q) => `/classroom?${convertToQueryString(q)}`,
			async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					console.log('useGetClassroomsQuery -> Success : ', data.data);
					dispatch(setPaginationState({ value: { total: data.data.pagination.totalData } }));
				} catch (err) {
					console.log('useGetClassroomsQuery -> Error : ', err);
				}
			},
			providesTags: ['Classrooms'],
		}),
		getClassroom: builder.query<ApiResponse<ClassroomId>, string>({
			query: (id) => `/classroom/${id}`,
			providesTags: ['Classroom'],
		}),
		addClassroom: builder.mutation<ApiResponse, z.infer<typeof createClassroomSchema>>({
			query: (payload) => ({
				url: '/classroom/new',
				method: 'POST',
				body: { ...payload, price: parseStringCurrencyToNumber(payload.price) },
			}),
			invalidatesTags: ['Classrooms'],
		}),
		enrollStudent: builder.mutation<ApiResponse, EnrollStudentRequest>({
			query: (payload) => {
				return {
					url: '/classroom/enroll',
					method: 'POST',
					body: payload,
				};
			},
			invalidatesTags: ['Classroom'],
		}),
		assignTeacherAndCourse: builder.mutation<ApiResponse, AssignTeacherAndCourseSchemaRequest>({
			query: (payload) => ({
				url: '/classroom/assign-course',
				method: 'POST',
				body: payload,
			}),
			invalidatesTags: ['Classroom'],
		}),
	}),
});

export const {
	useAddClassroomMutation,
	useGetClassroomsQuery,
	useGetClassroomQuery,
	useEnrollStudentMutation,
	useAssignTeacherAndCourseMutation,
} = classroomApiSlice;
