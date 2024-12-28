import axios from "axios";
import { getRequest,doneSuccess, getError, getFailed, getSuccess, addSuccess, deleteSuccess } from "./studentSlice";

export const getStudentList = () => async (dispatch) => {
    dispatch(getRequest())
    try {
        const result = await axios.get("https://quanlynhatruong.onrender.com/students")
        if (result.data.message)
            dispatch(getError(result.data))
        else
            dispatch(getSuccess(result))
    } catch (error) {
        dispatch(getFailed(error))
    }
}

export const addStudent = (data) => async (dispatch) => {
    try {
        dispatch(getRequest())
        const result = await axios.post("https://quanlynhatruong.onrender.com/students/add", data)
        alert('Thêm thành công')
        dispatch(addSuccess());
        return Promise.resolve();
    } catch (error) {
        alert('Có lỗi')
        console.log(error)
        dispatch(getFailed(error));
        return Promise.reject();
    }
}

export const deleteStudent = (id) => async (dispatch) => {
    try {
        dispatch(getRequest())
        console.log(id)
        const result = await axios.delete(`https://quanlynhatruong.onrender.com/students/delete/${id}`)
        if (result)
            dispatch(getFailed(result));
        dispatch(deleteSuccess())
        return Promise.resolve();
    } catch (error) {
        dispatch(getError(error))
        return Promise.reject();
    }
}

export const getDetailStudent = (id) => async (dispatch) => {
    
    try {
        dispatch(getRequest())
        const result = await axios.get(`https://quanlynhatruong.onrender.com/students/view/${id}`)
        console.log(result)
        if (result)
            
            dispatch(doneSuccess(result))
        else
            dispatch(getFailed(result))
    } catch (error) {
        dispatch(getError(error))
    }
}

export const updateStudent = (id, data) => async (dispatch) => {

    try {
        dispatch(getRequest())
        const result = await axios.put(`https://quanlynhatruong.onrender.com/students/edit/${id}`, data);
        alert('Sửa thành công');
        return Promise.resolve();
    } catch (error) {
        alert('Có lỗi')
        dispatch(getError(error))
        return Promise.reject();
    }
}

export const getStudentByUser = (userId) => async (dispatch) => {
    try {
        dispatch(getRequest());
        const response = await axios.get(`https://quanlynhatruong.onrender.com/user/${userId}/students`)
        dispatch(getSuccess(response))
    } catch (error) {
        dispatch(getError())
    }
}

export const getStudentByClass = (classId) => async (dispatch) => {
    try {
        dispatch(getRequest())
        const response = await axios.get(`https://quanlynhatruong.onrender.com/students/class/${classId}`);
        dispatch(getSuccess(response));
    } catch (error) {
        dispatch(getError(error));
    }
}

