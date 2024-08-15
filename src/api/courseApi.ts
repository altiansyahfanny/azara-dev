import { convertToQueryString } from "@/helpers/api-helper";
import { createCourseSchema, updateCourseSchema } from "@/schema/course";
import { setPaginationState } from "@/store/features/courseSlice";
import { ApiResponse, QueryParam } from "@/types/api.type";
import { CourseFilter, CoursesResponse } from "@/types/course.type";
import { z } from "zod";
import { apiSlice } from "./api";

export const courseApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCourses: builder.query<
            ApiResponse<CoursesResponse>,
            QueryParam<CourseFilter>
        >({
            query: (q) => `/course?${convertToQueryString(q)}`,
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    console.log(
                        "useGetCoursesQuery -> Success : ",
                        data.data.pagination
                    );
                    dispatch(
                        setPaginationState({
                            value: {
                                totalPage: data.data.pagination.totalPage,
                            },
                        })
                    );
                } catch (err) {
                    console.log("useGetCoursesQuery -> Error : ", err);
                }
            },
            providesTags: ["Courses"],
        }),
        addCourse: builder.mutation<
            ApiResponse,
            z.infer<typeof createCourseSchema>
        >({
            query: (payload) => ({
                url: "/course/new",
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["Courses"],
        }),
        updateCourse: builder.mutation<
            ApiResponse,
            z.infer<typeof updateCourseSchema> & { id: number }
        >({
            query: (payload) => ({
                url: `/course/${payload.id}`,
                method: "PATCH",
                body: payload,
            }),
            invalidatesTags: ["Courses"],
        }),
    }),
});

export const {
    useAddCourseMutation,
    useGetCoursesQuery,
    useUpdateCourseMutation,
} = courseApiSlice;
