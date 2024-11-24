import { apiSlice } from "../apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({role, formData}) => ({ url: `/${role}login`, method: "POST", body: formData }),
    }),
  }),
});

export const { useLoginMutation } = userApiSlice;
