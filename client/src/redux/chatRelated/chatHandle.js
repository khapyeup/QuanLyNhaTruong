import axios from "axios"
import { getSuccess, getRequest } from "./chatSlice"

export const getUserChat = (userId) => async (dispatch) => {
    try {
        dispatch(getRequest());
        const response = await axios.get(`http://localhost:3000/chats/${userId}`);
        dispatch(getSuccess(response.data));
    } catch (error) {
        alert('Có lỗi')
        console.log(error)
    }
    
}