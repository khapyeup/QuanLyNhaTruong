import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    classDetails: [],
    classList: [],
    error: null,
    response: null,
    loading: false,
}

const sclassSlice = createSlice({
    name: "sclass",
    initialState,
    reducers: {
        getRequest: (state) => {
            state.loading = true;
        },
        doneSuccess: (state, action) => {
            state.classDetails = action.payload.data;
            state.error = null;
            state.response = null;
            state.loading = false;
        },
        getSuccess: (state, action) => {
            state.classList = action.payload.data;
            state.error = null;
            state.response = null;
            state.loading = false;
        },
        getFailed: (state, action) => {
            state.error = null;
            state.response = action.payload;
            state.loading = false;
        },
        getError: (state, action) => {
            state.error = action.payload;
            state.response = null;
            state.loading = false;
        },
        updateSuccess: (state) => {
            state.error = null;
            state.response = null;
            state.loading = false;
        }

    }
})

export const {
    doneSuccess,
    getSuccess,
    getFailed,
    getError,
    getRequest
} = sclassSlice.actions

export const sclassReducer = sclassSlice.reducer