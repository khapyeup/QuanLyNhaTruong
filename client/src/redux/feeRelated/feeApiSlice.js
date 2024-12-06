import { apiSlice } from "../apiSlice";

export const feeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFeeList: builder.query({
      query: () => ({ url: "/fees" }),
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ _id }) => ({ type: "Fee", id: _id })), 'Fee']
          : ["Fee"],
    }),
    addFee: builder.mutation({
      query: (data) => ({
        url: "/fees",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Fee"],
    }),
    editFee: builder.mutation({
      query: (data) => ({
        url: `/fees/${data._id}`,
        method: "PUT",
        body: data
      }),
      invalidatesTags: (result,error,arg) => [{type: 'Fee', id: arg._id}]
    }),
    deleteFee: builder.mutation({
      query: (id) => ({
        url:  `/fees/${id}`,
        method: 'DELETE'
       
      }),
      invalidatesTags: ["Fee"]
    }),
    getFeeRemindSetting: builder.query({
      query: () => '/remind',
      providesTags: ['FeeRemindSetting']
    }),
    updateFeeRemindSetting: builder.mutation({
      query: (data) => ({
        url: '/remind',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['FeeRemindSetting']
    })
  }),
});

export const {
  useGetFeeListQuery,
  useAddFeeMutation,
  useEditFeeMutation,
  useDeleteFeeMutation,
  useGetFeeRemindSettingQuery,
  useUpdateFeeRemindSettingMutation
} = feeApiSlice;
