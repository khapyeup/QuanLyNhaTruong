import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    status: 'idle',
    loading: false,
    userList: [],
    userDetails: [],
    currentUser: JSON.parse(localStorage.getItem("user")) || null,
    currentRole: (JSON.parse(localStorage.getItem("user")) || {}).role || null,
    error: null,
    
    isOpen: true,
    onlineUsers: [],
    socket: null
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
        },
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload;
        },
        setSocket: (state, action) => {
            state.socket = action.payload;
        }

    }
});

export const {
    getRequest,
    authRequest,
    underControl,
    stuffAdded,
    authSuccess,
    authLogout,
    doneSuccess,
    getDeleteSuccess,
    getError,
    getUserListDone,
    isOpen,
    setOnlineUsers,
    setSocket
} = userSlice.actions;

export const userReducer = userSlice.reducer;