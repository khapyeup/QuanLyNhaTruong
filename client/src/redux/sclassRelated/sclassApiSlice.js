import { apiSlice } from "../apiSlice";

export const sclassApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSclassList: builder.query({
            query: () => ({url: '/classes'})
        })
    })
})

export const {useGetSclassListQuery} = sclassApiSlice;