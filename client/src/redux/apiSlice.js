import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

let users = [];

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  endpoints: (builder) => ({
    getUsers: builder.query({
        query: () => '/users'
    }),
    addNewUser: builder.mutation()
  }),
});
//Export the auto-generated hook for the getUsers query endpoint
export const { useGetUsersQuery } = apiSlice;
