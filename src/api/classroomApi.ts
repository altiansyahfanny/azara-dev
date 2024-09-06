import { convertToQueryString } from '@/helpers/api-helper';
import { createClassroomSchema, updateClassroomSchema } from '@/schema/classroom';
import { setPaginationState } from '@/store/features/classroomSlice';
import { ApiResponse, QueryParam } from '@/types/api.type';
import {
	Classroom,
	ClassroomCoursesResponse,
	ClassroomId,
	ClassroomsResponse,
} from '@/types/classroom.type';
import { z } from 'zod';
import { apiSlice } from './api';
import { parseStringCurrencyToNumber } from '@/helpers/app-helper';
import { AssignTeacherAndCourseSchemaRequest, EnrollStudentRequest } from '@/model/classroom';
import { updateAssignTeacherCourseSchema, updateEnrollStudentSchema } from '@/schema/classroomId';
import { format } from 'date-fns';

export const classroomApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		fetchClassroomCourses: builder.query<ApiResponse<ClassroomCoursesResponse>, void>({
			query: () => `/classroom-course`,
			// providesTags: ['Cycles'],
		}),

		getClassrooms: builder.query<ApiResponse<ClassroomsResponse>, QueryParam<Classroom>>({
			query: (q) => `/classroom?${convertToQueryString(q)}`,
			async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					console.log('useGetClassroomsQuery -> Success : ', data.data);
					dispatch(
						setPaginationState({
							value: {
								totalPage: data.data.pagination.totalPage,
							},
						})
					);
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
				body: {
					...payload,
					price: parseStringCurrencyToNumber(payload.price),
				},
			}),
			invalidatesTags: ['Classrooms'],
		}),

		updateClassroom: builder.mutation<
			ApiResponse,
			z.infer<typeof updateClassroomSchema> & { id: number }
		>({
			query: (payload) => ({
				url: `/classroom/${payload.id}`,
				method: 'PATCH',
				body: {
					...payload,
					price: parseStringCurrencyToNumber(payload.price),
				},
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

		updateEnrollStudent: builder.mutation<
			ApiResponse,
			z.infer<typeof updateEnrollStudentSchema> & { id: number }
		>({
			query: (payload) => {
				return {
					url: `/classroom/enroll/${payload.id}`,
					method: 'PATCH',
					body: {
						...payload,
						joinDate: format(payload.joinDate, 'yyyy-LL-dd'),
					},
				};
			},
			invalidatesTags: ['Classroom'],
		}),

		deleteEnrollment: builder.mutation<ApiResponse, { id: number }>({
			query: (payload) => ({
				url: `/classroom/enroll/${payload.id}`,
				method: 'DELETE',
			}),
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
		updateAssignTeacherAndCourse: builder.mutation<
			ApiResponse,
			z.infer<typeof updateAssignTeacherCourseSchema> & { id: number }
		>({
			query: (payload) => ({
				url: `/classroom-course/${payload.id}`,
				method: 'PATCH',
				body: {
					// ...payload,
					paymentPrice: parseStringCurrencyToNumber(payload.paymentPrice),
				},
			}),
			invalidatesTags: ['Classroom'],
		}),

		deleteAssignTeacher: builder.mutation<ApiResponse, { id: number }>({
			query: (payload) => ({
				url: `/classroom-course/${payload.id}`,
				method: 'DELETE',
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
	useUpdateClassroomMutation,
	useFetchClassroomCoursesQuery,
	useUpdateEnrollStudentMutation,
	useUpdateAssignTeacherAndCourseMutation,
	useDeleteEnrollmentMutation,
	useDeleteAssignTeacherMutation,
} = classroomApiSlice;
