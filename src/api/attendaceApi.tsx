import { ApiResponse } from "@/types/api.type";
import { MeetingAttendance } from "@/types/meetingId.type";
import { apiSlice } from "./api";
import { setDataSources } from "@/store/features/attendanceSlice";

export const meetingApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAttendaces: builder.query<
            ApiResponse<MeetingAttendance[]>,
            { id: number }
        >({
            query: () => `/attendance/1`,
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    console.log(
                        "useGetAttendanceQuery -> Success : ",
                        data.data
                    );

                    dispatch(setDataSources({ value: data.data }));
                } catch (err) {
                    console.log("useGetAttendancesQuery -> Error : ", err);
                }
            },
            providesTags: ["Attendaces"],
        }),
    }),
});

export const { useGetAttendacesQuery } = meetingApiSlice;
