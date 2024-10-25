import axios from "axios";
import { getSuccess } from "./activitySlice";

export const getActivityList = () => async (dispatch) => {
    try {
        const result = await axios.get("http://localhost:3000/group_activity");
        dispatch(getSuccess(result.data));
    } catch (error) {
        console.log(error)
    }
}

export const addGroupActivity = (data) => async (dispatch) => {
    try {
        const result = await axios.post("http://localhost:3000/group_activity", data)
        if (result) {
            alert('Thêm group thành công')
        } else {
            alert('Có lỗi')
            console.log(result)
        }

    } catch (error) {
        alert('Có lỗi')
        console.log(error)
    }
}

export const deleteGroupActivity = (id) => async (dispatch) => {
    try {
        const result = await axios.delete(`http://localhost:3000/group_activity/${id}`)
        if (result)
            alert('Xóa thành công')
        else {
            alert('Có lỗi')
            console.log(error)
        }

    } catch (error) {
        alert('Có lỗi')
        console.log(error)
    }
}

export const updateGroupActivity = (id, data) => async (dispatch) => {

    try {

        const result = await axios.put(`http://localhost:3000/group_activity/${id}`, data);
        if (result)
            alert('Update group thành công')
        else {
            alert('Có lỗi')
            console.log(result)
        }

    } catch (error) {
        alert('Có lỗi')
        console.log(error)
    }
}

export const addActivity = (id, data) => async (dispatch) => {
    try {
        const result = await axios.post(`http://localhost:3000/group_activity/${id}/activity`, data)
        if (result) {
            alert('Thêm hoạt động thành công')
        } else {
            alert('Có lỗi')
            console.log(result)
        }

    } catch (error) {
        alert('Có lỗi')
        console.log(error)
    }
}


export const updateActivity = (id, activityId ,data) => async (dispatch) => {

    try {

        const result = await axios.put(`http://localhost:3000/group_activity/${id}/activity/${activityId}`, data);
        if (result)
            alert('Update  thành công')
        else {
            alert('Có lỗi')
            console.log(result)
        }

    } catch (error) {
        alert('Có lỗi')
        console.log(error)
    }
}

export const deleteActivity = (id, activityId) => async (dispatch) => {
    try {
        const result = await axios.delete(`http://localhost:3000/group_activity/${id}/activity/${activityId}`)
        if (result)
            alert('Xóa thành công')
        else {
            alert('Có lỗi')
            console.log(error)
        }

    } catch (error) {
        alert('Có lỗi')
        console.log(error)
    }
}

