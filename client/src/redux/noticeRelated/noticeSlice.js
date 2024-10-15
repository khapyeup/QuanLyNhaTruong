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
            state.noticeDetails = action.payload.data;
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
        },
        addSuccess: (state) => {
            state.loading = false;
            state.error = null;
            state.response = null;
            state.message = "Thêm thành công";
        },
        deleteSuccess: (state) => {
            state.loading = false;
            state.message = "Xóa thành công";
            state.error = null;
            state.response = null;
        }
    }
})

export const {
    doneSuccess,
    getSuccess,
    getFailed,
    getError,
    addSuccess,
    deleteSuccess
} = noticeSlice.actions

export const noticeReducer = noticeSlice.reducer