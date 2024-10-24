import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    status: 'idle',
    loading: false,
    userList: [],
    userDetails: [],
    tempDetails: [],
    currentUser: JSON.parse(localStorage.getItem("user")) || null,
    currentRole: (JSON.parse(localStorage.getItem("user")) || {}).role || null,
    error: null,
    response: null,
    isOpen: true
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getRequest: (state) => {
            state.loading = true;
        },
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
            state.loading = false;
            state.error = null;
            state.response = null;
        },
        getDeleteSuccess: (state) => {
            state.error = null;
            state.loading = false;
            state.response = null;
        },
        getFailed: (state, action) => {
            state.response = action.payload;
            state.error = null;
            state.loading = false;
        },
        getError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        isOpen: (state) => {
            state.isOpen = !state.isOpen;
        },
        getUserListDone: (state, action) => {
            state.error = null;
            state.response = null;
            state.userList = action.payload;
            state.loading = false;
        }

    }
});

export const {
    getRequest,
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
    getError,
    getUserListDone,
    isOpen
} = userSlice.actions;

export const userReducer = userSlice.reducer;