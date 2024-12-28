import axios from 'axios';
import { getRequest, getFinancesDone } from "./financeSlice";

export const fetchFinances = () => async (dispatch) => {
    try {
        dispatch(getRequest());
        const response = await axios.get('https://quanlynhatruong.onrender.com/finances');
        dispatch(getFinancesDone(response.data));
    } catch (err) {
        alert('Có lỗi khi lấy dữ liệu');
        console.log(err);
    }
};

export const fetchFinancesByUserId = (userId) => async (dispatch) => {
    try {
        dispatch(getRequest());
        const response = await axios.get(`https://quanlynhatruong.onrender.com/finances/user/${userId}`);
        dispatch(getFinancesDone(response.data));
    } catch (err) {
        alert('Có lỗi khi lấy dữ liệu');
        console.log(err);
    }
}

export const addPayment = (data) => async (dispatch) => {
    try {
        dispatch(getRequest());
        await axios.post('https://quanlynhatruong.onrender.com/payments', data);
    } catch {

    }
}

