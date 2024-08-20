import { convertToQueryString } from "@/helpers/api-helper";
import { createPaymentSchema, updatePaymentSchema } from "@/schema/payment";
import { setPaginationState } from "@/store/features/paymentSlice";
import { ApiResponse, QueryParam } from "@/types/api.type";
import { PaymentFilter, PaymentsResponse } from "@/types/payment.type";
import { z } from "zod";
import { apiSlice } from "./api";

export const paymentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPayments: builder.query<
            ApiResponse<PaymentsResponse>,
            QueryParam<PaymentFilter>
        >({
            query: (q) => `/teacher-payment?${convertToQueryString(q)}`,
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    console.log(
                        "useGetPaymentsQuery -> Success : ",
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
                body: payload,
            }),
            invalidatesTags: ["Payments"],
        }),
        updatePayment: builder.mutation<
            ApiResponse,
            z.infer<typeof updatePaymentSchema> & { id: number }
        >({
            query: (payload) => ({
                url: `/teacher-payment/${payload.id}`,
                method: "PATCH",
                body: payload,
            }),
            invalidatesTags: ["Payments"],
        }),
    }),
});

export const {
    useAddPaymentMutation,
    useGetPaymentsQuery,
    useUpdatePaymentMutation,
} = paymentApiSlice;
