import axios from 'axios';
import {
    authRequest,
    stuffAdded,
    authSuccess,
    authFailed,
    authError,
    authLogout,
    doneSuccess,
    getDeleteSuccess,
    getFailed,
    getError,
    getUserListDone,
    getRequest,
    isOpen
} from "./userSlice"

export const loginUser = (fields, role) => async (dispatch) => {
    dispatch(authRequest());
    try {
        const result = await axios.post(`http://localhost:3000/${role}Login`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });

        if (result.data.role) {
            dispatch(authSuccess(result.data))
        } else {
            dispatch(authFailed(result.data))
        }
    } catch (error) {
        dispatch(authError(error));
    }
}

export const logoutUser = () => (dispatch) => {
    dispatch(authLogout());
}

export const getUserList = () => async (dispatch) => {
    try {
        const userList = await axios.get('http://localhost:3000/users')
        dispatch(getUserListDone(userList.data));
    } catch (error) {
        console.log(error);
    }
    

}

export const getUserDetails = (id) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`http://localhost:3000/users/${id}`);
        if (result.data) {
            dispatch(doneSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const deleteUser = (id, address) => async (dispatch) => {
    dispatch(getRequest());
    dispatch(getFailed("Sorry the delete function has been disable for now"))
}

export const updateUser = (fields, id) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.put(`http://localhost:3000/users/${id}`, fields, { headers: { 'Content-Type': 'application/json' } });
        if (result.data) {
            dispatch(doneSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const addStuff = (fields, address) => async (dispatch) => {
    dispatch(authRequest());

    try {
        const result = await axios.post(`http://localhost:3000/${address}Create`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });

        if (result.data.message) {
            dispatch(authFailed(result.data.message));
        } else {
            dispatch(stuffAdded(result.data));
        }
    } catch (error) {
        dispatch(authError(error));
    }
};

export const addUser = (data) => async (dispatch) => {
    try {
        const result = await axios.post('http://localhost:3000/users/add', data);
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
        
    }
}


export const showSideBar = () => (dispatch) => {
    dispatch(isOpen());
}