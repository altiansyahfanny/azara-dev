import { convertToQueryString } from "@/helpers/api-helper";
import { setPaginationState } from "@/store/features/meetingSlice";
import { ApiResponse, QueryParam } from "@/types/api.type";
import { Meeting, MeetingsResponse } from "@/types/meeting.type";
import { apiSlice } from "./api";
import { z } from "zod";
import { createMeetingSchema, updateMeetingSchema } from "@/schema/meeting";
import { format } from "date-fns";
import { MeetingId } from "@/types/meetingId.type";
import { setDataSourcesCreate } from "@/store/features/attendanceSlice";

export const meetingApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMeetings: builder.query<
            ApiResponse<MeetingsResponse>,
            QueryParam<Meeting>
        >({
            query: (q) => `/meeting?${convertToQueryString(q)}`,
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    console.log("useGetMeetingsQuery -> Success : ", data.data);
                    dispatch(
                        setPaginationState({
                            value: {
                                totalPage: data.data.pagination.totalPage,
                            },
                        })
                    );
                    // dispatch(
                    //     setDataSourcesCreate({
                    //         value: data.data.meetings,
                    //     })
                    // );
                } catch (err) {
                    console.log("useGetMeetingsQuery -> Error : ", err);
                }
            },
            providesTags: ["Meetings"],
        }),

        getMeeting: builder.query<ApiResponse<MeetingId>, string>({
            query: (id) => `/meeting/${id}`,
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    console.log("useGetMeetingQuery -> Success : ", data);

                    dispatch(
                        setDataSourcesCreate({
                            value: data.data.students.map((student) => ({
                                ...student,
                                status: "unregistered",
                            })),
                        })
                    );
                } catch (err) {
                    console.log("useGetMeetingsQuery -> Error : ", err);
                }
            },
            providesTags: ["Meeting"],
        }),

        addMeeting: builder.mutation<
            ApiResponse,
            z.infer<typeof createMeetingSchema>
        >({
            query: (payload) => ({
                url: "/meeting/new",
                method: "POST",
                body: {
                    ...payload,
                    meetingDate: format(payload.meetingDate, "yyyy-LL-dd"),
                },
            }),
            invalidatesTags: ["Meetings"],
        }),

        verifyMeeting: builder.mutation<ApiResponse, { id: number }>({
            query: (payload) => ({
                url: `/meeting/verify-meeting/${payload.id}`,
                method: "PATCH",
                body: payload,
            }),
            invalidatesTags: ["Meetings"],
        }),

        deleteMeeting: builder.mutation<ApiResponse, { id: number }>({
            query: (payload) => ({
                url: `/meeting/${payload.id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Meetings"],
        }),

        updateMeeting: builder.mutation<
            ApiResponse,
            z.infer<typeof updateMeetingSchema> & { id: number }
        >({
            query: (payload) => {
                return {
                    url: `/meeting/${payload.id}`,
                    method: "PATCH",
                    body: {
                        ...payload,
                        meetingDate: format(payload.meetingDate, "yyyy-LL-dd"),
                    },
                };
            },
            invalidatesTags: ["Meetings"],
        }),

        getAttendace: builder.query<
            ApiResponse<MeetingsResponse>,
            QueryParam<Meeting>
        >({
            query: (q) => `/meeting?${convertToQueryString(q)}`,
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    console.log("useGetMeetingsQuery -> Success : ", data.data);
                    dispatch(
                        setPaginationState({
                            value: {
                                totalPage: data.data.pagination.totalPage,
                            },
                        })
                    );
                } catch (err) {
                    console.log("useGetMeetingsQuery -> Error : ", err);
                }
            },
            providesTags: ["Meetings"],
        }),
    }),
});

export const {
    useGetMeetingsQuery,
    useAddMeetingMutation,
    useVerifyMeetingMutation,
    useUpdateMeetingMutation,
    useGetMeetingQuery,
    useDeleteMeetingMutation,
} = meetingApiSlice;
