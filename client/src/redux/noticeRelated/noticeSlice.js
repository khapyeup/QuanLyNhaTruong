import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    noticeDetails: [],
    noticeList: [],
    error: null,
    response: null
}

const noticeSlice = createSlice({
    name: "notice",
    initialState,
    reducers: {
        doneSuccess: (state, action) => {
            state.noticeDetails = action.payload;
            state.error = null;
            state.response = null;
        },
        getSuccess: (state, action) => {
            state.noticeList = action.payload.data;
            state.error = null;
            state.response = null;
        },
        getFailed: (state, action) => {
            state.error = null;
            state.response = action.payload;
        },
        getError: (state, action) => {
            state.error = action.payload;
            state.response = null;
        }
    }
})

export const {
    doneSuccess,
    getSuccess,
    getFailed,
    getError
} = noticeSlice.actions

export const noticeReducer = noticeSlice.reducer