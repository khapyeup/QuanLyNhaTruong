import { apiSlice } from "../apiSlice";

const paymentApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        assignPaymentToClass: builder.mutation({
            query: (data) => ({
                url: `/payments/assigntoclass`,
                method: "POST",
                body: data
            })
        })
    })
})

export const {useAssignPaymentToClassMutation} = paymentApiSlice;