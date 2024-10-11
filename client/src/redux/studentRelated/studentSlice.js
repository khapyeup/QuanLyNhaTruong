import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    studentList: [],
    studentDetails: [],
    error: null,
    response: null
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
        },
        addSuccess: (state) => {
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
    addSuccess
} = studentSlice.actions;

export const studentReducer = studentSlice.reducer;