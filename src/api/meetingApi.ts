import { convertToQueryString } from "@/helpers/api-helper";
import { setPaginationState } from "@/store/features/meetingSlice";
import { ApiResponse, QueryParam } from "@/types/api.type";
import { Meeting, MeetingsResponse } from "@/types/meeting.type";
import { apiSlice } from "./api";
import { z } from "zod";
import { createMeetingSchema, updateMeetingSchema } from "@/schema/meeting";
import { format } from "date-fns";

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
                } catch (err) {
                    console.log("useGetMeetingsQuery -> Error : ", err);
                }
            },
            providesTags: ["Meetings"],
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
                    },
                };
            },
            invalidatesTags: ["Meetings"],
        }),
    }),
});

export const {
    useGetMeetingsQuery,
    useAddMeetingMutation,
    useVerifyMeetingMutation,
    useUpdateMeetingMutation,
} = meetingApiSlice;
