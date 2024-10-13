import {createSlice} from "@reduxjs/toolkit";

const initialState = {
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
        doneSuccess: (state, action) => {
            state.studentDetails = action.payload.data;
            
            state.error = null;
            state.response = null;
        },
        getSuccess: (state, action) => {
            state.studentList = action.payload.data;
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
            state.message = action.payload.message;
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
} = studentSlice.actions;

export const studentReducer = studentSlice.reducer;