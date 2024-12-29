import { apiSlice } from "../apiSlice";
import { addActivity, deleteGroupActivity } from "./activityHandle";

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
      invalidatesTags: ["GroupActivity"],
    }),
    editGroupActivity: builder.mutation({
      query: (patch) => ({
        url: `/group_activity/${patch.id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["GroupActivity"],
    }),
    deleteGroupActivity: builder.mutation({
      query: (id) => ({
        url: `/group_activity/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["GroupActivity"],
    }),
    getActivity: builder.query({
      query: (id) => `/group_activity/${id}`,
      providesTags: ["SubActivity"],
    }),
    addActivity: builder.mutation({
      query: (patch) => ({
        url: `/group_activity/${patch.id}/activity`,
        method: "POST",
        body: patch,
      }),
      invalidatesTags: ["SubActivity"],
    }),
    editActivity: builder.mutation({
      query: (patch) => ({
        url: `/group_activity/${patch.id}/activity/${patch.activityId}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["SubActivity"],
    }),
    deleteActivity: builder.mutation({
      query: (patch) => ({
        url: `/group_activity/${patch.id}/activity/${patch.activityId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SubActivity"],
    }),
  }),
});

export const {
  useGetGroupActivityQuery,
  useAddGroupActivityMutation,
  useEditGroupActivityMutation,
  useDeleteGroupActivityMutation,
  useGetActivityQuery,
  useAddActivityMutation,
  useEditActivityMutation,
  useDeleteActivityMutation
} = activityApiSlice;
