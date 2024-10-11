import axios from "axios";
import { doneSuccess, getError, getFailed, getSuccess } from "./teacherSlice";

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