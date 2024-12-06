import { apiSlice } from "../apiSlice";

export const studentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStudentList: builder.query({
      query: () => ({ url: "/students" }),
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ _id }) => ({ type: "Student", id: _id })), 'Student']
          : ["Student"],
    }),
    getStudentDetails: builder.query({
      query: (id) => ({
        url: `/students/view/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getStudentByParent: builder.query({
      query: (userId) => `/user/${userId}/students`
    }),
    addStudent: builder.mutation({
      query: (data) => ({
        url: "/students/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Student"],
    }),
    editStudent: builder.mutation({
      query: (data) => ({
        url: `/students/edit/${data._id}`,
        method: "PUT",
        body: data
      }),
      invalidatesTags: (result,error,arg) => [{type: 'Student', id: arg._id}]
    }),
    deleteStudent: builder.mutation({
      query: (id) => ({
        url:  `/students/delete/${id}`,
        method: 'DELETE'
       
      }),
      invalidatesTags: ["Student"]
    })
  }),
});

export const {
  useGetStudentListQuery,
  useGetStudentByParentQuery,
  useGetStudentDetailsQuery,
  useAddStudentMutation,
  useEditStudentMutation,
  useDeleteStudentMutation
} = studentApiSlice;
