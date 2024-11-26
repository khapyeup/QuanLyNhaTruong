import { apiSlice } from "../apiSlice";

export const sclassApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSclassList: builder.query({
      query: () => ({ url: "/classes" }),
      providesTags: ['Sclass']
    }),
    addSclass: builder.mutation({
      query: (data) => ({
        url: "/classes/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['Sclass']
    }),
    editSclass: builder.mutation({
      query: (data) => ({
        url: `/classes/edit/${data._id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ['Sclass']
    }),
    deleteSclass: builder.mutation({
      query: (id) => ({ url: `/classes/delete/${id}`, method: "DELETE" }),
      invalidatesTags: ['Sclass']
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

export const {
  useGetSclassListQuery,
  useAddSclassMutation,
  useEditSclassMutation,
  useDeleteSclassMutation,
  useUpdateScheduleMutation,
} = sclassApiSlice;
