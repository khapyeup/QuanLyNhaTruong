import axios from "axios"
import { getRequest, getConversationsDone, getMessagesDone, postSuccess } from "./chatSlice"

export const fetchConversations = (sender) => async (dispatch) => {
    try {
        dispatch(getRequest());
        const response = await axios.get(`http://localhost:3000/conversations/${sender}`);
        dispatch(getConversationsDone(response.data));
    } catch (error) {
        alert('Có lỗi')
        console.log(error)
    }

}

export const fetchMessages = (sender, receiver) => async (dispatch) => {
    try {
        dispatch(getRequest());
        const response = await axios.get(`http://localhost:3000/messages/${sender}&${receiver}`);
        dispatch(fetchMesseage)
    } catch (error) {
        alert('Có lỗi')
        console.log(error)
    }
}


export const sendMessage = (message) => async (dispatch) => {
    try {
        dispatch(getRequest());
        const response = await axios.post('http://localhost:3000/messages', message);
        dispatch(postSuccess(response.data));
    } catch (error) {
        alert('Có lỗi')
        console.log(error)
    }
}

