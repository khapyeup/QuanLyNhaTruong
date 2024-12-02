import { apiSlice } from "../apiSlice";

export const progressApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProgressRecords: builder.query({
      query: (id) => ({
        url: `/progress/${id}`,
      }),
      providesTags: ["Progress"],
    }),
    getProgressRecordDetail: builder.query({
      query: (id) => ({
        url: `/progress/record/${id}`,
      })
      
    }),
    addProgressRecord: builder.mutation({
      query: (data) => ({
        url: `/progress/record`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Progress"],
    }),
    updateProgressRecord: builder.mutation({
      query: (data) => ({
        url: `/progress/record/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Progress"],
    }),
    deleteRecord: builder.mutation({
      query: (id) => ({
        url: `/progress/record/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Progress"]
    }),
    addFeedback: builder.mutation({
      query: (data) => ({
        url: `/progress/record/${data.id}/feedback`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Progress"],
    }),
    updateSeenStatus: builder.mutation({
      query: (id) => ({
        url: `/progress/record/${id}/seen`,
        method: "PATCH",
      }),
      invalidatesTags: ["Progress"],
    }),
  }),
});

export const {
  useGetProgressRecordsQuery,
  useGetProgressRecordDetailQuery,
  useAddProgressRecordMutation,
  useUpdateProgressRecordMutation,
  useAddFeedbackMutation,
  useDeleteRecordMutation,
  useUpdateSeenStatusMutation,
} = progressApiSlice;
