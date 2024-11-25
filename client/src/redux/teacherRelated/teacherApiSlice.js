import { apiSlice } from "../apiSlice";

export const teacherApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeacherList: builder.query({
      query: () => ({ url: "/teachers" }),
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Teacher", id: _id })),
              "Teacher",
            ]
          : ["Teacher"],
    }),
    getTeacherDetails: builder.query({
      query: (id) => ({
        url: `/teachers/view/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    addTeacher: builder.mutation({
      query: (data) => ({
        url: "/teachers/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Teacher"],
    }),
    editTeacher: builder.mutation({
      query: (data) => ({
        url: `/teachers/edit/${data._id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Teacher", id: arg._id },
      ],
    }),
    deleteTeacher: builder.mutation({
      query: (id) => ({
        url: `/teachers/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Teacher"],
    }),
  }),
});

export const {
  useGetTeacherListQuery,
  useGetTeacherDetailsQuery,
  useAddTeacherMutation,
  useEditTeacherMutation,
  useDeleteTeacherMutation,
} = teacherApiSlice;
