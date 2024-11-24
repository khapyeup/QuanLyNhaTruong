import { apiSlice } from "../apiSlice";

export const noticeSliceApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getNoticeList: builder.query({
            query: () => ({url: '/notices'})
        })
    })
})

export const {useGetNoticeListQuery} = noticeSliceApi;