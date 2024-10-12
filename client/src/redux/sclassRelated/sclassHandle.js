import axios from "axios";
import { doneSuccess, getError, getFailed, getSuccess } from "./sclassSlice";

export const getClassList = () => async (dispatch) => {
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
