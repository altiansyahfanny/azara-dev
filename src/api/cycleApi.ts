import { convertToQueryString } from '@/helpers/api-helper';
import { createCycleSchema } from '@/schema/cycle';
import { setPaginationState } from '@/store/features/cycleSlice';
import { ApiResponseType, ParamsType } from '@/types/api.type';
import { CycleType, CyclesResponseType } from '@/types/cycle.type';
import { z } from 'zod';
import { apiSlice } from './api';

export const cycleApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getCycles: builder.query<ApiResponseType<CyclesResponseType>, ParamsType<CycleType>>({
			query: (q) => `/cycle?${convertToQueryString(q)}`,
			async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					console.log('useGetCyclesQuery -> Success : ', data.data.pagination);
					dispatch(setPaginationState({ value: { total: data.data.pagination.totalData } }));
				} catch (err) {
					console.log('useGetCyclesQuery -> Error : ', err);
				}
			},
			providesTags: ['Cycles'],
		}),
		addCycle: builder.mutation<ApiResponseType, z.infer<typeof createCycleSchema>>({
			query: (payload) => ({
				url: '/cycle/new',
				method: 'POST',
				body: payload,
			}),
			invalidatesTags: ['Cycles'],
		}),
	}),
});

export const { useAddCycleMutation, useGetCyclesQuery } = cycleApiSlice;
