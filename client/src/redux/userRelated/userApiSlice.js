import { apiSlice } from "../apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ role, formData }) => ({
        url: `/${role}login`,
        method: "POST",
        body: formData,
      }),
    }),
    addParent: builder.mutation({
      query: ( patch ) => ({
        url: "/parents",
        method: "POST",
        body: patch,
      }),
    }),
    updateParent: builder.mutation({
      query: (patch) => ({
        url: `/parents/${patch._id}`,
        method: "PUT",
        body: patch,
      }),
    }),
    deleteParent: builder.mutation({
      query: (id) => ({
        url: `/parents/${id}`,
        method: "DELETE",
      }),
    }),
    getParentDetail: builder.query({
      query: (id) => `/parents/${id}` 
    }),
    
  }),
});

export const {
  useLoginMutation,
  useAddParentMutation,
  useUpdateParentMutation,
  useDeleteParentMutation,
  useGetParentDetailQuery
} = userApiSlice;
