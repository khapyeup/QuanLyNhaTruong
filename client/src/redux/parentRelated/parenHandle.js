import axios from "axios";
import { doneSuccess, getError, getFailed, getSuccess, addSuccess, deleteSuccess } from "./parentSlice";

export const getParentList = () => async (dispatch) => {
    try {
        const result = await axios.get("http://localhost:3000/parents");
        if (result.status == 200)
        {
            dispatch(getSuccess(result));
        }
        else 
        
            dispatch(getFailed(result));
    } catch (error) {
        dispatch(getError(result));
    }  
}