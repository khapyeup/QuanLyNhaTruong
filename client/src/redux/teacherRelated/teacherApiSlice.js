import { apiSlice } from "../apiSlice";

export const teacherApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeacherList: builder.query({
      query: () => ({ url: "/teachers" }),
    })
  }),
});

export const { useGetTeacherListQuery } = teacherApiSlice;
