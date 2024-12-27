import { apiSlice } from "../apiSlice";

export const parentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getParentList: builder.query({
      query: () => ({ url: "/parents" }),
      providesTags: ["Parent"],
    }),
    getParentDetails: builder.query({
      query: (id) => ({ url: `/parents/${id}` }),
    }),
    addParent: builder.mutation({
      query: (user) => ({ url: "/parents", method: "POST", body: user }),
      invalidatesTags: ["Parent"]
    }),
    editParent: builder.mutation({
      query: (user) => ({
        url: `/parents/${user._id}`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ["Parent"]
    }),
    deleteParent: builder.mutation({
      query: (id) => ({ url: `/parents/${id}`, method: "DELETE" }),
      invalidatesTags: ["Parent"]
    }),
  }),
});

export const { useGetParentListQuery, useAddParentMutation, useGetParentDetailsQuery, useEditParentMutation, useDeleteParentMutation } = parentApiSlice;
