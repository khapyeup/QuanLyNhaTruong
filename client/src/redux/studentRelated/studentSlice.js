import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    studentList: [],
    studentDetails: [],
    error: null,
    response: null,
    message: ''
}

const studentSlice = createSlice({
    name: "student",
    initialState,
    reducers: {
        getRequest: (state) => {
            state.loading = true;
        },
        doneSuccess: (state, action) => {
            state.studentDetails = action.payload.data;
            state.loading = false;
            state.error = null;
            state.response = null;
        },
        getSuccess: (state, action) => {
            state.loading = false;
            state.studentList = action.payload.data;
            state.error = null;
            state.response = null;
        },
        getFailed: (state, action) => {
            state.loading = false;
            state.error = null;
            state.response = action.payload;
        },
        getError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.response = null;
            state.message = action.payload.message;
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
    getRequest,
    doneSuccess,
    getSuccess,
    getFailed,
    getError,
    addSuccess,
    deleteSuccess
} = studentSlice.actions;

export const studentReducer = studentSlice.reducer;