import { convertToQueryString } from '@/helpers/api-helper';
import { setPaginationState } from '@/store/features/meetingSlice';
import { ApiResponse, QueryParam } from '@/types/api.type';
import { Meeting, MeetingsResponse } from '@/types/meeting.type';
import { apiSlice } from './api';

export const meetingApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getMeetings: builder.query<ApiResponse<MeetingsResponse>, QueryParam<Meeting>>({
			query: (q) => `/meeting?${convertToQueryString(q)}`,
			async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					console.log('useGetMeetingsQuery -> Success : ', data.data);
					dispatch(setPaginationState({ value: { total: data.data.pagination.totalData } }));
				} catch (err) {
					console.log('useGetMeetingsQuery -> Error : ', err);
				}
			},
			providesTags: ['Meetings'],
		}),
	}),
});

export const { useGetMeetingsQuery } = meetingApiSlice;
