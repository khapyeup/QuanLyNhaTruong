import { apiSlice } from "../apiSlice";

export const progressApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProgressRecords: builder.query({
      query: (id) => ({
        url: `/progress/${id}`,
      }),
    }),
  }),
});

export const { useGetProgressRecordsQuery } = progressApiSlice;
