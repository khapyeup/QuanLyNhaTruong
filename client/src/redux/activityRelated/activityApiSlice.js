import { apiSlice } from "../apiSlice";

export const activityApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGroupActivity: builder.query({
      query: () => "/group_activity",
    }),
  }),
});

export const { useGetGroupActivityQuery } = activityApiSlice;
