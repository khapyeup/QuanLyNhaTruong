import axios from "axios";
import { getSuccess } from "./activitySlice";

export const getActivityList = () => async (dispatch) => {
    try {
        const result = await axios.get("http://localhost:3000/activity");
        dispatch(getSuccess(result));
    } catch (error) {
        console.log(error)
    }
}

export const addActivity = (data) => async (dispatch) => {
    try {
        const result = await axios.post("http://localhost:3000/activity/add", data)
        console.log("Thêm thành công");
    } catch (error) {
        console.log(error)
    }
}

export const deleteActivity = (id) => async (dispatch) => {
    try {
        const result = await axios.delete(`http://localhost:3000/activity/delete/${id}`)
        console.log('Xóa thành công')
    } catch (error) {
        console.log(error)
    }
}

export const updateActivity = (id, data) => async (dispatch) => {

    try {
        
        const result = await axios.put(`http://localhost:3000/activity/edit/${id}`, data);
        console.log("Sửa thành công");
    } catch (error) {
        console.log(error);
    }
}

