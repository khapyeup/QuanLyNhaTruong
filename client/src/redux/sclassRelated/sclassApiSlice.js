import { apiSlice } from "../apiSlice";

export const sclassApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSclassList: builder.query({
      query: () => ({ url: "/classes" }),
    }),
    updateSchedule: builder.mutation({
      query: (data) => ({
        url: `/classes/schedule/${data.class_id}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const { useGetSclassListQuery, useUpdateScheduleMutation } = sclassApiSlice;
