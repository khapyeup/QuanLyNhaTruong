import { createSlice } from "@reduxjs/toolkit";
import { addSuccess } from "../noticeRelated/noticeSlice";

const initialState = {
    activityList: [],
    error: null,
};

const activitySlice = createSlice({
    name: 'activity',
    initialState,
    reducers: {
        getSuccess: (state, action) => {
            state.activityList = action.payload.data;
            state.error = null;
        }
    }
})

export const {getSuccess} = activitySlice.actions;

export const activityReducer = activitySlice.reducer;