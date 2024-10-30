import axios from "axios";
import { getRequest,doneSuccess, getError, getFailed, getSuccess, addSuccess, deleteSuccess } from "./studentSlice";

export const getStudentList = () => async (dispatch) => {
    dispatch(getRequest())
    try {
        const result = await axios.get("http://localhost:3000/students")
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
        const result = await axios.post("http://localhost:3000/students/add", data)
        alert('Thêm thành công')
        dispatch(addSuccess());
    } catch (error) {
        alert('Có lỗi')
        console.log(error)
        dispatch(getFailed(error));
    }
}

export const deleteStudent = (id) => async (dispatch) => {
    try {
        dispatch(getRequest())
        console.log(id)
        const result = await axios.delete(`http://localhost:3000/students/delete/${id}`)
        if (result)
            dispatch(getFailed(result));
        dispatch(deleteSuccess())
    } catch (error) {
        dispatch(getError(error))
    }
}

export const getDetailStudent = (id) => async (dispatch) => {
    
    try {
        dispatch(getRequest())
        const result = await axios.get(`http://localhost:3000/students/view/${id}`)
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
        const result = await axios.put(`http://localhost:3000/students/edit/${id}`, data);
        alert('Sửa thành công');
    } catch (error) {
        alert('Có lỗi')
        dispatch(getError(error))
    }
}

export const getStudentByUser = (userId) => async (dispatch) => {
    try {
        dispatch(getRequest());
        const response = await axios.get(`http://localhost:3000/user/${userId}/students`)
        dispatch(getSuccess(response))
    } catch (error) {
        dispatch(getError())
    }
}

