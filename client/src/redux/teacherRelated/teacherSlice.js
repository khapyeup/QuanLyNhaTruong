import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    teacherList: [],
    teacherDetails: [],
    error: null,
    response: null,
    message: ''
};

const teacherSlice = createSlice({
    name: 'teacher',
    initialState,
    reducers: {
        doneSuccess: (state, action) => {
            state.teacherDetails = action.payload.data;
            state.error = null;
            state.response = null;
        },
        getSuccess: (state, action) => {
            state.teacherList = action.payload.data;
            state.error = null;
            state.response = null;
        },
        getFailed: (state, action) => {
            state.error = null;
            state.response = action.payload;
            state.message = action.payload.message;
        },
        getError: (state, action) => {
            state.error = action.payload;
            state.response = null;
        },
        addSuccess: (state) => {
            state.error = null;
            state.response = null;
            state.message = "Thêm thành công";
        },
        deleteSuccess: (state) => {
            state.message = "Xóa thành công";
            state.error = null;
            state.response = null;
        },
        editSuccess: (state) => {
            state.message = "Sửa thành công";
            state.error = null;
            state.response = null;
        }
    }
});

export const {
    doneSuccess,
    getSuccess,
    getFailed,
    getError,
    addSuccess,
    deleteSuccess,
    editSuccess
} = teacherSlice.actions;

export const teacherReducer = teacherSlice.reducer;