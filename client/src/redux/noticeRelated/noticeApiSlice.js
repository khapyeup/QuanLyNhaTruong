import { apiSlice } from "../apiSlice";

export const noticeSliceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNoticeList: builder.query({
      query: () => ({ url: "/notices" }),
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Notice", id: _id })),
              "Notice",
            ]
          : ["Notice"],
    }),

    getNoticeDetails: builder.query({
      query: (id) => ({
        url: `/notices/view/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    addNotice: builder.mutation({
      query: (data) => ({
        url: "/notices/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Notice"],
    }),
    editNotice: builder.mutation({
      query: (data) => ({
        url: `/notices/edit/${data._id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Notice", id: arg._id },
      ],
    }),
    deleteNotice: builder.mutation({
      query: (id) => ({
        url: `/notices/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notice"],
    }),
  }),
});

export const { useGetNoticeListQuery, useGetNoticeDetailsQuery, useAddNoticeMutation, useEditNoticeMutation, useDeleteNoticeMutation } = noticeSliceApi;
