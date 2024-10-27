import axios from 'axios';
import { getRequest, getFinancesDone } from "./financeSlice";

export const fetchFinances = () => async (dispatch) => {
    try {
        dispatch(getRequest());
        const response = await axios.get('http://localhost:3000/finances');
        dispatch(getFinancesDone(response.data));
    } catch (err) {
        alert('Có lỗi khi lấy dữ liệu');
        console.log(err);
    }
};

export const fetchFinancesByUserId = (userId) => async (dispatch) => {
    try {
        dispatch(getRequest());
        const response = await axios.get(`http://localhost:3000/finances/user/${userId}`);
        dispatch(getFinancesDone(response.data));
    } catch (err) {
        alert('Có lỗi khi lấy dữ liệu');
        console.log(err);
    }
}

export const addPayment = (data) => async (dispatch) => {
    try {
        dispatch(getRequest());
        await axios.post('http://localhost:3000/payments', data);
    } catch {

    }
}

