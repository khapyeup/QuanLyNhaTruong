import { apiSlice } from "../apiSlice";
import { deleteGroupActivity } from "./activityHandle";

export const activityApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGroupActivity: builder.query({
      query: () => "/group_activity",
      providesTags: ["GroupActivity"],
    }),
    addGroupActivity: builder.mutation({
      query: (patch) => ({
        url: "/group_activity",
        method: "POST",
        body: patch,
      }),
      invalidatesTags: ["GroupActivity"]
    }),
    editGroupActivity: builder.mutation({
      query: (patch) => ({
        url: `/group_activity/${patch.id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["GroupActivity"]
    }),
    deleteGroupActivity : builder.mutation({
      query: (id) => ({
        url: `/group_activity/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["GroupActivity"]
    }),
  }),
});

export const { useGetGroupActivityQuery, useAddGroupActivityMutation, useEditGroupActivityMutation, useDeleteGroupActivityMutation } = activityApiSlice;
