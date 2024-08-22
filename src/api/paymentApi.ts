import { convertToQueryString } from "@/helpers/api-helper";
import { parseStringCurrencyToNumber } from "@/helpers/app-helper";
import { createPaymentSchema } from "@/schema/payment";
import { setPaginationState } from "@/store/features/paymentSlice";
import { ApiResponse, QueryParam } from "@/types/api.type";
import { PaymentHistoryFilter, PaymentsResponse } from "@/types/payment.type";
import { format } from "date-fns";
import { z } from "zod";
import { apiSlice } from "./api";

export const paymentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPayments: builder.query<
            ApiResponse<PaymentsResponse>,
            QueryParam<PaymentHistoryFilter>
        >({
            query: (q) => `/teacher-payment?${convertToQueryString(q)}`,
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    console.log(
                        "useGetPaymentsHistoryQuery -> Success : ",
                        data.data.pagination
                    );
                    dispatch(
                        setPaginationState({
                            value: {
                                totalPage: data.data.pagination.totalPage,
                            },
                        })
                    );
                } catch (err) {
                    console.log("useGetPaymentsQuery -> Error : ", err);
                }
            },
            providesTags: ["Payments"],
        }),

        addPayment: builder.mutation<
            ApiResponse,
            z.infer<typeof createPaymentSchema>
        >({
            query: (payload) => ({
                url: "/teacher-payment/new",
                method: "POST",
                body: {
                    ...payload,
                    paymentDate: format(payload.paymentDate, "yyyy-LL-dd"),
                    amount: parseStringCurrencyToNumber(payload.amount),
                },
            }),
            invalidatesTags: ["PaymentsHistory"],
        }),
    }),
});

export const { useAddPaymentMutation, useGetPaymentsQuery } = paymentApiSlice;
