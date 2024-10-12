import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    parentList: [],
    parentDetails: [],
    error: null,
    response: null,
    message: ''
}

const parentSlice = createSlice({
    name: "parent",
    initialState,
    reducers: {
        doneSuccess: (state, action) => {
            state.parentDetails = action.payload.data;
            
            state.error = null;
            state.response = null;
        },
        getSuccess: (state, action) => {
            state.parentList = action.payload.data;
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
        },
        addSuccess: (state) => {
            state.error = null;
            state.response = null;
            state.message = "Thêm thành công";
        },
        deleteSuccess: (state) => {
            state.message = "Xóa thành công";
            state.error = null;
            state.response = null;
        }
    }
})

export const {
    doneSuccess,
    getSuccess,
    getFailed,
    getError,
    addSuccess,
    deleteSuccess
} = parentSlice.actions;

export const parentReducer = parentSlice.reducer;