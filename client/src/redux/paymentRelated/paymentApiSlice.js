import { apiSlice } from "../apiSlice";

const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    assignPaymentToClass: builder.mutation({
      query: (data) => ({
        url: `/payments/assigntoclass`,
        method: "POST",
        body: data,
      }),
    }),
    getPaymentDetail: builder.query({
      query: (studentId) => `/payments/${studentId}`,
      providesTags: ['Payment']
    }),
    addSubPayment: builder.mutation({
      query: (data) => ({
        url: `/payments/${data._id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['Payment']
    }),
  }),
});

export const { useAssignPaymentToClassMutation, useGetPaymentDetailQuery, useAddSubPaymentMutation } =
  paymentApiSlice;
