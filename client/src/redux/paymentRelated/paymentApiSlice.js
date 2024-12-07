import { apiSlice } from "../apiSlice";
import { io } from "socket.io-client";

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
    getPaymentNofitication: builder.query({
      query: (userId) => `/payments/nofitication/${userId}`,
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

export const { useAssignPaymentToClassMutation, useGetPaymentDetailQuery, useAddSubPaymentMutation, useGetPaymentNofiticationQuery } =
  paymentApiSlice;
