import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: JSON.parse(localStorage.getItem("user")) || null,
  currentRole: (JSON.parse(localStorage.getItem("user")) || {}).role || null,
  isOpen: true,
  onlineUsers: [],
  socket: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.currentRole = action.payload.role;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    authLogout: (state) => {
      localStorage.removeItem("user");
      state.currentUser = null;
      state.currentRole = null;
    },
    isOpen: (state) => {
      state.isOpen = !state.isOpen;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
  },
});

export const { authSuccess, authLogout, isOpen, setOnlineUsers, setSocket } = userSlice.actions;

export const userReducer = userSlice.reducer;
