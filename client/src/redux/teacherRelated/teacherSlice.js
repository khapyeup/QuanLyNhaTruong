import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    teacherList: [],
    teacherDetails: [],
    error: null,
    response: null
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
        },
        getError: (state, action) => {
            state.error = action.payload;
            state.response = null;
        }
    }
});

export const {
    doneSuccess,
    getSuccess,
    getFailed,
    getError
} = teacherSlice.actions;

export const teacherReducer = teacherSlice.reducer;