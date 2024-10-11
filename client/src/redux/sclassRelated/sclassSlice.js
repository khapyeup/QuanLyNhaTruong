import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    classDetails: [],
    classList: [],
    error: null,
    response: null
}

const sclassSlice = createSlice({
    name: "sclass",
    initialState,
    reducers: {
        doneSuccess: (state, action) => {
            state.classDetails = action.payload;
            state.error = null;
            state.response = null;
        },
        getSuccess: (state, action) => {
            state.classList = action.payload.data;
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
} = sclassSlice.actions

export const sclassReducer = sclassSlice.reducer