import axios from "axios";
import { doneSuccess, getError, getFailed, getSuccess, addSuccess, deleteSuccess, editSuccess } from "./teacherSlice";

export const getTeacherList = () => async (dispatch) => {
    try {
        const result = await axios.get(`https://quanlynhatruong.onrender.com/teachers`)

        if (result.data.message)
            dispatch(getFailed(result.data))
        else
            dispatch(getSuccess(result))
    } catch (error) {
        dispatch(getError(error))
    }
}

export const addTeacher = (data) => async (dispatch) => {
    try {
        const result = await axios.post("https://quanlynhatruong.onrender.com/teachers/add", data)
        alert(result.data)
        dispatch(addSuccess())
        return Promise.resolve();
    } catch (error) {
        alert(error.response.data.errorResponse.errmsg)
        dispatch(getFailed(error))
        return Promise.reject();
    }
}

export const deleteTeacher = (id) => async (dispatch) => {
    try {
        const result = await axios.delete(`https://quanlynhatruong.onrender.com/teachers/delete/${id}`)
        if (result)
            dispatch(getFailed(result));
        alert('Xoá thành công!')
        dispatch(deleteSuccess())
        return Promise.resolve();
    } catch (error) {
        alert('Có lỗi khi xoá')
        console.log(error)
        dispatch(getError(error))
        return Promise.reject();
    }
}

export const getDetailTeacher = (id) => async (dispatch) => {

    try {
        const result = await axios.get(`https://quanlynhatruong.onrender.com/teachers/view/${id}`)
        if (result)
            dispatch(doneSuccess(result))
        else
            dispatch(getFailed(result))
    } catch (error) {
        dispatch(getError(error))
    }
}

export const updateTeacher = (id, data) => async (dispatch) => {
    try {

        const result = await axios.put(`https://quanlynhatruong.onrender.com/teachers/edit/${id}`, data);
        if (result.message) {
            dispatch(getFailed(result))
            return Promise.reject();
        }
        else {
            alert('Chỉnh sửa thành công!')
            dispatch(editSuccess())
            return Promise.resolve();
        }

    } catch (error) {
        alert('Có lỗi')
        console.log(error)
        dispatch(getError(error))
        return Promise.reject();
    }
}