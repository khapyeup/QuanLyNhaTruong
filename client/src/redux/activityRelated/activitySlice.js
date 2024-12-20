import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    activityList: [],
    error: null,
};

const activitySlice = createSlice({
    name: 'activity',
    initialState,
    reducers: {
        getSuccess: (state, action) => {
            state.activityList = action.payload;
            state.error = null;
        }
    }
})

export const {getSuccess} = activitySlice.actions;

export const activityReducer = activitySlice.reducer;