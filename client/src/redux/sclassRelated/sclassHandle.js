import axios from "axios";
import { doneSuccess, getError, getFailed, getRequest, getSuccess } from "./sclassSlice";

export const getClassList = () => async (dispatch) => {
    dispatch(getRequest())
    try {
        const result = await axios.get("https://quanlynhatruong.onrender.com/classes")
        if (result.data.message)
            dispatch(getError(result.data))
        else
            dispatch(getSuccess(result))
    } catch (error) {
        dispatch(getFailed(error))
    }
}

export const addClass = (data) => async (dispatch) => {
    dispatch(getRequest())
    try {
        const result = await axios.post(`https://quanlynhatruong.onrender.com/classes/add`, data)
        if (result) {
            console.log("Thêm lớp thành công");
            return Promise.resolve();
        } else {
            dispatch(getFailed())
            return Promise.reject();
        }
    } catch (error) {
        dispatch(getError())
        return Promise.reject();
    }
}

export const updateClass = (id, data) => async (dispatch) => {
    dispatch(getRequest())
    try {
        const result = await axios.put(`https://quanlynhatruong.onrender.com/classes/edit/${id}`, data)
        if (result) {
            alert('Cập nhật thành công')
            dispatch(getSuccess())
            return Promise.resolve();
        } else {
            dispatch(getFailed())
            return Promise.reject();
        }
    } catch (error) {
        dispatch(getError())
        return Promise.reject();
    }
}

export const updateSchedule = (classId, data) => async (dispatch) => {
    dispatch(getRequest())
    try {
        const result = await axios.put(`https://quanlynhatruong.onrender.com/classes/schedule/${classId}`, data)
        if (result) {
            dispatch(getSuccess())
            return Promise.resolve();
        } else {
            dispatch(getFailed())
        }
    } catch (error) {
        dispatch(getError())
    }
}

export const getDetailClass = (classId) => async (dispatch) => {
    dispatch(getRequest())
    try {
        const result = await axios.get(`https://quanlynhatruong.onrender.com/classes/view/${classId}`);
        if (result) {
            
            dispatch(doneSuccess(result))
        } else {
            dispatch(getFailed())
        }
    } catch (error) {
        dispatch(getError(error))
    }
}

