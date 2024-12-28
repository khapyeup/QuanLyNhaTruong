import axios from "axios";
import { doneSuccess, getError, getFailed, getSuccess, addSuccess, deleteSuccess } from "./noticeSlice";

export const getNoticeList = () => async (dispatch) => {
    try {
        const result = await axios.get("https://quanlynhatruong.onrender.com/notices")
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
        const result = await axios.post("https://quanlynhatruong.onrender.com/notices/add", data)
        dispatch(addSuccess())
    } catch (error) {
        dispatch(getFailed(error))
    }
}

export const deleteNotice = (id) => async (dispatch) => {
    try {
        const result = await axios.delete(`https://quanlynhatruong.onrender.com/notices/delete/${id}`)
        if (result)
            dispatch(getFailed(result));
        dispatch(deleteSuccess())
    } catch (error) {
        dispatch(getError(error))
    }
}

export const getDetailNotice = (id) => async (dispatch) => {
    
    try {
        const result = await axios.get(`https://quanlynhatruong.onrender.com/notices/view/${id}`)
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
        const result = await axios.put(`https://quanlynhatruong.onrender.com/notices/edit/${id}`, data);
        console.log(result)
        if (result.message)
            dispatch(getFailed(result))
        else
            dispatch(doneSuccess(result))
    } catch (error) {
        dispatch(getError(error))
    }
}

