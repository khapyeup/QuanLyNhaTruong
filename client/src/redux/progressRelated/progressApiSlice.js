import { apiSlice } from "../apiSlice";

export const progressApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProgressRecords: builder.query({
      query: (id) => ({
        url: `/progress/${id}`,
      }),
      providesTags: ["Progress"],
    }),
    addProgressRecord: builder.mutation({
      query: (data) => ({
        url: `/progress/record`,
        method: "POST",
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
  useAddProgressRecordMutation,
  useAddFeedbackMutation,
  useDeleteRecordMutation,
  useUpdateSeenStatusMutation,
} = progressApiSlice;
