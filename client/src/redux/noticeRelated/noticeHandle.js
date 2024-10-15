import axios from "axios";
import { doneSuccess, getError, getFailed, getSuccess, addSuccess, deleteSuccess } from "./noticeSlice";

export const getNoticeList = () => async (dispatch) => {
    try {
        const result = await axios.get("http://localhost:3000/notices")
        if (result.data.message)
            dispatch(getError(result.data))
        else
            dispatch(getSuccess(result))
    } catch (error) {
        dispatch(getFailed(error))
    }
}

export const addNotice = (data) => async (dispatch) => {
    try {
        const result = await axios.post("http://localhost:3000/notices/add", data)
        dispatch(addSuccess())
    } catch (error) {
        dispatch(getFailed(error))
    }
}

export const deleteNotice = (id) => async (dispatch) => {
    try {
        const result = await axios.delete(`http://localhost:3000/notices/delete/${id}`)
        if (result)
            dispatch(getFailed(result));
        dispatch(deleteSuccess())
    } catch (error) {
        dispatch(getError(error))
    }
}

export const getDetailNotice = (id) => async (dispatch) => {
    
    try {
        const result = await axios.get(`http://localhost:3000/notices/view/${id}`)
        if (result)
            dispatch(doneSuccess(result))
        else
            dispatch(getFailed(result))
    } catch (error) {
        dispatch(getError(error))
    }
}

export const updateNotice = (id, data) => async (dispatch) => {

    try {
        const result = await axios.put(`http://localhost:3000/notices/edit/${id}`, data);
        console.log(result)
        if (result.message)
            dispatch(getFailed(result))
        else
            dispatch(doneSuccess(result))
    } catch (error) {
        dispatch(getError(error))
    }
}

