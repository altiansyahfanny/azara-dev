import { ApiResponse, QueryParam } from "@/types/api.type";
import { apiSlice } from "./api";
import { TeacherFilter, TeachersResponse } from "@/types/user.type";
import { convertToQueryString } from "@/helpers/api-helper";
import { setPaginationState } from "@/store/features/teacherSlice";
import { z } from "zod";
import { updateTeacherSchema } from "@/schema/teacher";

export const UserApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTeachers: builder.query<
            ApiResponse<TeachersResponse>,
            QueryParam<TeacherFilter>
        >({
            query: (q) => `/teacher?${convertToQueryString(q)}`,
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    console.log("useGetTeachersQuery -> Success : ", data.data);
                    dispatch(
                        setPaginationState({
                            value: {
                                totalPage: data.data.pagination.totalPage,
                            },
                        })
                    );
                } catch (err) {
                    console.log("useGetTeachersQuery -> Error : ", err);
                }
            },
            providesTags: ["Teachers"],
        }),

        updateTeacher: builder.mutation<
            ApiResponse,
            z.infer<typeof updateTeacherSchema> & { id: number }
        >({
            query: (payload) => ({
                url: `/teacher/${payload.id}`,
                method: "PATCH",
                body: payload,
            }),
            invalidatesTags: ["Teachers"],
        }),
    }),
});

export const {
    useGetTeachersQuery,
    useUpdateTeacherMutation,
    // useAddUserMutation, useGetUserQuery, useGetUserProfileQuery
} = UserApiSlice;
