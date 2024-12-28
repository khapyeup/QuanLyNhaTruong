import axios from "axios";
import { doneSuccess, getError, getFailed, getSuccess, addSuccess, deleteSuccess } from "./parentSlice";

export const getParentList = () => async (dispatch) => {
    try {
        const result = await axios.get("https://quanlynhatruong.onrender.com/parents");
        if (result.status == 200)
        {
            dispatch(getSuccess(result));
        }
        else 
        
            dispatch(getFailed(result));
    } catch (error) {
        dispatch(getError(result));
        return Promise.reject();
    }  
}

export const addParent = (data) => async (dispatch) => {
    try {
        const result = await axios.post('https://quanlynhatruong.onrender.com/parents', data);
        if (!result)
        {
            alert('Có lỗi, kiểm tra console');
            console.log(result);
            dispatch(getFailed(result));
        }
    } catch (error) {
        alert('Có lỗi, kiểm tra console');
        console.log(error);
        dispatch(getError(error));
        return Promise.reject();
    }
}

export const deleteParent = (id, address) => async (dispatch) => {
    dispatch(getRequest());
    dispatch(getFailed("Sorry the delete function has been disable for now"))
}

export const updateParent = (fields, id) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.put(`https://quanlynhatruong.onrender.com/parents/${id}`, fields, { headers: { 'Content-Type': 'application/json' } });
        if (result.data) {
            dispatch(doneSuccess(result.data));
            return Promise.resolve();
        }
    } catch (error) {
        dispatch(getError(error));
        return Promise.reject();
    }
}