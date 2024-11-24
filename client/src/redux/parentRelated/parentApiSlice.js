import { apiSlice } from "../apiSlice";

export const parentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getParentList: builder.query({
            query: () => ({url: '/parents'})
        })
    })
})

export const {useGetParentListQuery} = parentApiSlice;