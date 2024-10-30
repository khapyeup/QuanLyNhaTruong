import axios from "axios";
import { doneSuccess, getError, getFailed, getSuccess, addSuccess, deleteSuccess, editSuccess } from "./teacherSlice";

export const getTeacherList = () => async (dispatch) => {
    try {
        const result = await axios.get(`http://localhost:3000/teachers`)
        
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
        const result = await axios.post("http://localhost:3000/teachers/add", data)
        alert(result.data)
        dispatch(addSuccess())
    } catch (error) {
        alert(error.response.data.errorResponse.errmsg)
        dispatch(getFailed(error))
    }
}

export const deleteTeacher = (id) => async (dispatch) => {
    try {
        const result = await axios.delete(`http://localhost:3000/teachers/delete/${id}`)
        if (result)
            dispatch(getFailed(result));
        dispatch(deleteSuccess())
    } catch (error) {
        dispatch(getError(error))
    }
}

export const getDetailTeacher = (id) => async (dispatch) => {
    
    try {
        const result = await axios.get(`http://localhost:3000/teachers/view/${id}`)
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
        
        const result = await axios.put(`http://localhost:3000/teachers/edit/${id}`, data);
        if (result.message)
            dispatch(getFailed(result))
        else
            dispatch(editSuccess())
    } catch (error) {
        dispatch(getError(error))
    }
}