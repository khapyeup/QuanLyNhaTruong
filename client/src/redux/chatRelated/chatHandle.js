import axios from "axios"
import { getRequest, getConversationsDone, getMessagesDone, postSuccess } from "./chatSlice"

export const fetchConversations = (sender) => async (dispatch) => {
    try {
        dispatch(getRequest());
        const response = await axios.get(`https://quanlynhatruong.onrender.com/conversations/${sender}`);
        dispatch(getConversationsDone(response.data));
    } catch (error) {
        alert('Có lỗi')
        console.log(error)
    }

}

export const fetchMessages = (sender, receiver) => async (dispatch) => {
    try {
        dispatch(getRequest());
        const response = await axios.get(`https://quanlynhatruong.onrender.com/messages/${sender}&${receiver}`);
        dispatch(fetchMesseage)
    } catch (error) {
        alert('Có lỗi')
        console.log(error)
    }
}


export const sendMessage = (message) => async (dispatch) => {
    try {
        dispatch(getRequest());
        const response = await axios.post('https://quanlynhatruong.onrender.com/messages', message);
        dispatch(postSuccess(response.data));
    } catch (error) {
        alert('Có lỗi')
        console.log(error)
    }
}

