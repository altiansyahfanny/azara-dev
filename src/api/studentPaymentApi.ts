import { convertToQueryString } from '@/helpers/api-helper';
import { parseStringCurrencyToNumber } from '@/helpers/app-helper';
import { setPaginationState } from '@/store/features/studentPaymentListSlice';
import { ApiResponse, QueryParam } from '@/types/api.type';
import { format } from 'date-fns';
import { z } from 'zod';
import { apiSlice } from './api';
import { StudentPaymentFilter, StudentPaymentsResponse } from '@/types/stundentPayment.type';
import { createStudentPaymentSchema } from '@/schema/studentPayment';

export const studentPaymentApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getStudentPayments: builder.query<
			ApiResponse<StudentPaymentsResponse>,
			QueryParam<StudentPaymentFilter>
		>({
			query: (q) => `/student-payment/list?${convertToQueryString(q)}`,
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
					console.log('useGetStudentPaymentsQuery -> Error : ', err);
				}
			},
			providesTags: ['StudentPayments'],
		}),

		addStudentPayment: builder.mutation<ApiResponse, z.infer<typeof createStudentPaymentSchema>>({
			query: (payload) => ({
				url: '/student-payment',
				method: 'POST',
				body: {
					...payload,
					forMonth: format(payload.forMonth, 'yyyy-LL-dd'),
					paymentDate: format(payload.paymentDate, 'yyyy-LL-dd'),
					originalPrice: parseStringCurrencyToNumber(payload.originalPrice),
					discount: parseStringCurrencyToNumber(payload.discount),
				},
			}),
			invalidatesTags: ['StudentPaymentsHistory', 'StudentPayments'],
		}),
	}),
});

export const { useGetStudentPaymentsQuery, useAddStudentPaymentMutation } = studentPaymentApiSlice;
