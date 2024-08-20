import { ApiResponse } from "@/types/api.type";
import { MeetingAttendance } from "@/types/meetingId.type";
import { apiSlice } from "./api";
import { setDataSourcesUpdate } from "@/store/features/attendanceSlice";

export const meetingApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAttendaces: builder.query<
            ApiResponse<MeetingAttendance[]>,
            { id: string }
        >({
            query: (payload) => `/attendance/${payload.id}`,
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;

                    console.log("useGetAttendacesQuery -> Success x : ", data);
                    console.log(
                        "useGetAttendanceQuery -> Success : ",
                        data.data
                    );

                    dispatch(setDataSourcesUpdate({ value: data.data }));
                } catch (err) {
                    console.log("useGetAttendancesQuery -> Error : ", err);
                }
            },
            providesTags: ["Attendances"],
        }),

        addAttendance: builder.mutation<ApiResponse, any>({
            query: (payload) => ({
                url: "/attendance/new",
                method: "POST",
                body: {
                    ...payload,
                },
            }),
            invalidatesTags: ["Attendances"],
        }),

        updateAttendance: builder.mutation<
            ApiResponse,
            { id: string; attendances: any }
        >({
            query: (payload) => ({
                url: `/attendance/${payload.id}`,
                method: "PATCH",
                body: {
                    attendances: payload.attendances,
                },
            }),
            invalidatesTags: ["Attendances"],
        }),

        deleteAttendance: builder.mutation<ApiResponse, { id: number }>({
            query: (payload) => ({
                url: `/attendance/${payload.id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Attendances"],
        }),
    }),
});

export const {
    useGetAttendacesQuery,
    useAddAttendanceMutation,
    useUpdateAttendanceMutation,
    useDeleteAttendanceMutation,
} = meetingApiSlice;
