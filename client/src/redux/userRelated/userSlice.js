import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    status: 'idle',
    userDetails: [],
    tempDetails: [],
    currentUser: JSON.parse(localStorage.getItem("user")) || null,
    currentRole: (JSON.parse(localStorage.getItem("user")) || {}).role || null,
    error: null,
    response: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        authRequest: (state) => {
            state.status = "loading";
        },
        underControl: (state) => {
            state.status = "idle";
            state.response = null;
        },
        stuffAdded: (state, action) => {
            state.status = "added";
            state.response = null;
            state.error = null;
            state.tempDetails = action.payload;
        },
        authSuccess: (state, action) => {
            state.status = "success";
            state.currentUser = action.payload;
            state.currentRole = action.payload.role;
            localStorage.setItem("user", JSON.stringify(action.payload));
            state.respone = null;
            state.error = null;
        },
        authFailed: (state, action) => {
            state.status = "failed";
            state.response = action.payload;
        },
        authError: (state, action) => {
            state.status = "error";
            state.error = action.payload;
        },
        authLogout: (state) => {
            localStorage.removeItem("user");
            state.currentUser = null;
            state.status = "idle"
            state.error = null;
            state.currentRole = null;
        },
        doneSuccess: (state, action) => {
            state.userDetails = action.payload;
            state.error = null;
            state.response = null;
        },
        getDeleteSuccess: (state) => {
            state.error = null;
            state.response = null;
        },
        getFailed: (state, action) => {
            state.response = action.payload;
            state.error = null;
        },
        getError: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const {
    authRequest,
    underControl,
    stuffAdded,
    authSuccess,
    authFailed,
    authError,
    authLogout,
    doneSuccess,
    getDeleteSuccess,
    getFailed,
    getError
} = userSlice.actions;

export const userReducer = userSlice.reducer;