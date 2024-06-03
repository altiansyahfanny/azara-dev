import { convertToQueryString } from '@/helpers/api-helper';
import { createCourseSchema } from '@/schema/course';
import { setPaginationState } from '@/store/features/courseSlice';
import { ApiResponseType, ParamsType } from '@/types/api.type';
import { CourseType, CoursesResponseType } from '@/types/course.type';
import { z } from 'zod';
import { apiSlice } from './api';

export const courseApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getCourses: builder.query<ApiResponseType<CoursesResponseType>, ParamsType<CourseType>>({
			query: (q) => `/course?${convertToQueryString(q)}`,
			async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					console.log('useGetCoursesQuery -> Success : ', data.data.pagination);
					dispatch(setPaginationState({ value: { total: data.data.pagination.totalData } }));
				} catch (err) {
					console.log('useGetCoursesQuery -> Error : ', err);
				}
			},
			providesTags: ['Courses'],
		}),
		addCourse: builder.mutation<ApiResponseType, z.infer<typeof createCourseSchema>>({
			query: (payload) => ({
				url: '/course/new',
				method: 'POST',
				body: payload,
			}),
			invalidatesTags: ['Courses'],
		}),
	}),
});

export const { useAddCourseMutation, useGetCoursesQuery } = courseApiSlice;
