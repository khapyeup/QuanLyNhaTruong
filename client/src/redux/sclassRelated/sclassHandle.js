import axios from "axios";
import { doneSuccess, getError, getFailed, getRequest, getSuccess } from "./sclassSlice";

export const getClassList = () => async (dispatch) => {
    dispatch(getRequest())
    try {
        const result = await axios.get("http://localhost:3000/classes")
        if (result.data.message)
            dispatch(getError(result.data))
        else
            dispatch(getSuccess(result))
    } catch (error) {
        dispatch(getFailed(error))
    }
}

export const updateSchedule = (classId, data) => async (dispatch) => {
    dispatch(getRequest())
    try {
        const result = await axios.put(`http://localhost:3000/classes/schedule/${classId}`, data)
        if (result) {
            dispatch(getSuccess())
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
        const result = await axios.get(`http://localhost:3000/classes/view/${classId}`);
        if (result) {
            
            dispatch(doneSuccess(result))
        } else {
            dispatch(getFailed())
        }
    } catch (error) {
        dispatch(getError(error))
    }
}

