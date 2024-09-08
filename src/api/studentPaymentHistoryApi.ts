import { convertToQueryString } from '@/helpers/api-helper';
import { setPaginationState } from '@/store/features/studentPaymentHistorySlice';
import { ApiResponse, QueryParam } from '@/types/api.type';
import { PaymentHistoryFilter, PaymentsHistoryResponse } from '@/types/payment.type';
import { apiSlice } from './api';
import { z } from 'zod';
import { updateStudentPaymentHistorySchema } from '@/schema/studentPayment';

export const paymentHistoryApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getStudentPaymentsHistory: builder.query<
			ApiResponse<PaymentsHistoryResponse>,
			QueryParam<PaymentHistoryFilter>
		>({
			query: (q) => `/student-payment?${convertToQueryString(q)}`,
			async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;

					console.log('useGetStudentPaymentsHistoryQuery -> Success : ', data.data.pagination);

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
			providesTags: ['StudentPaymentsHistory'],
		}),

		deleteStudentPaymentHistory: builder.mutation<ApiResponse, { id: number }>({
			query: (payload) => ({
				url: `/student-payment/${payload.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['StudentPaymentsHistory', 'StudentPayments'],
		}),

		updateStudentPaymentHistory: builder.mutation<
			ApiResponse,
			z.infer<typeof updateStudentPaymentHistorySchema> & { id: number }
		>({
			query: (payload) => ({
				url: `/student-payment/${payload.id}`,
				method: 'PATCH',
				body: payload,
			}),
			invalidatesTags: ['StudentPaymentsHistory'],
		}),
	}),
});

export const {
	useGetStudentPaymentsHistoryQuery,
	useDeleteStudentPaymentHistoryMutation,
	useUpdateStudentPaymentHistoryMutation,
} = paymentHistoryApiSlice;
