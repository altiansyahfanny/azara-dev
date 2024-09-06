import { convertToQueryString } from '@/helpers/api-helper';
import { setPaginationState } from '@/store/features/paymentHistorySlice';
import { ApiResponse, QueryParam } from '@/types/api.type';
import { PaymentHistoryFilter, PaymentsHistoryResponse } from '@/types/payment.type';
import { apiSlice } from './api';
import { z } from 'zod';
import { updatePaymentHistorySchema } from '@/schema/payment';

export const paymentHistoryApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getPaymentsHistory: builder.query<
			ApiResponse<PaymentsHistoryResponse>,
			QueryParam<PaymentHistoryFilter>
		>({
			query: (q) => `/teacher-payment/history?${convertToQueryString(q)}`,
			async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;

					console.log('useGetPaymentsHistoryQuery -> Success : ', data.data.pagination);

					dispatch(
						setPaginationState({
							value: {
								totalPage: data.data.pagination.totalPage,
							},
						})
					);
				} catch (err) {
					console.log('useGetPaymentsQuery -> Error : ', err);
				}
			},
			providesTags: ['PaymentsHistory'],
		}),

		deletePaymentHistory: builder.mutation<ApiResponse, { id: number }>({
			query: (payload) => ({
				url: `/teacher-payment/history/${payload.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['PaymentsHistory', 'Payments'],
		}),

		updatePaymentHistory: builder.mutation<
			ApiResponse,
			z.infer<typeof updatePaymentHistorySchema> & { id: number }
		>({
			query: (payload) => ({
				url: `/teacher-payment/history/${payload.id}`,
				method: 'PATCH',
				body: payload,
			}),
			invalidatesTags: ['PaymentsHistory'],
		}),
	}),
});

export const {
	useGetPaymentsHistoryQuery,
	useDeletePaymentHistoryMutation,
	useUpdatePaymentHistoryMutation,
} = paymentHistoryApiSlice;
