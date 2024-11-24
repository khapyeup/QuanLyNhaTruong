import { apiSlice } from "../apiSlice";

export const studentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStudentList: builder.query({
      query: () => ({ url: "/students" }),
    }),
  }),
});

export const { useGetStudentListQuery } = studentApiSlice;
