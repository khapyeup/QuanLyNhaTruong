import axios from "axios";
import { doneSuccess, getError, getFailed, getSuccess, addSuccess, deleteSuccess } from "./studentSlice";

export const getStudentList = () => async (dispatch) => {
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
        const result = await axios.post("http://localhost:3000/students/add", data)
        dispatch(addSuccess())
    } catch (error) {
        dispatch(getFailed(error))
    }
}

export const deleteStudent = (id) => async (dispatch) => {
    try {
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
    console.log("getDetailStudent")
    try {
        const result = await axios.get(`http://localhost:3000/students/view/${id}`)
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
        const result = await axios.put(`http://localhost:3000/students/edit/${id}`, data);
        if (result.message)
            dispatch(getFailed(result))
        else
            dispatch(doneSuccess(result))
    } catch (error) {
        dispatch(getError(error))
    }
}

