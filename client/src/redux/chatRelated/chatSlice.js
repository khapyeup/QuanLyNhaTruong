import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    conversations: [],
    messages: [],
    loading: false,
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        getRequest: (state) => {
            state.loading = true;
        },
        getConversationsDone: (state, action) => {
            state.conversations = action.payload;
            state.error = null;
            state.loading = false;
        },
        getMessagesDone: (state, action) => {
            state.messages = action.payload;
            state.error = null;
            state.loading = false;
        },
        postSuccess: (state, action) => {
            this.messages = [...messages, action.payload];
            state.error = null;
            state.loading = false;
        }
    }
})

export const { getRequest, getConversationsDone, getMessagesDone, postSuccess } = chatSlice.actions;

export const chatReducer = chatSlice.reducer;