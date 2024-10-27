import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    userChat: [],
    error: null,
    loading: false,
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        getRequest: (state) => {
            state.loading = true;
        },
        getSuccess: (state, action) => {
            state.userChat = action.payload;
            state.error = null;
            state.loading = false;
        }
    }
})

export const { getRequest, getSuccess } = chatSlice.actions;

export const chatReducer = chatSlice.reducer;