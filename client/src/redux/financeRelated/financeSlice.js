import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    finances: [],
    payments: [],
    finance: null,
    loading: false,
}

const financeSlice = createSlice({
    name: 'Finance',
    initialState,
    reducers: {
        getRequest: (state) => {
            state.loading = true;
        },
        getFinancesDone: (state, action) => {
            state.finances = action.payload;
            state.loading = false;
        },
        getPaymentsDone: (state, action) => {
            state.loading = false;
            state.payments = action.payload;
        }
    }
})

export const {getRequest, getFinancesDone, getPaymentsDone} = financeSlice.actions;

export const financeReducer = financeSlice.reducer;