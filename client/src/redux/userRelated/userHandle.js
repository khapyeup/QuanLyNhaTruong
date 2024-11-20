import axios from "axios";
import {
  authRequest,
  stuffAdded,
  authSuccess,
  authLogout,
  doneSuccess,
  getDeleteSuccess,
  getError,
  getUserListDone,
  getRequest,
  isOpen,
  setOnlineUsers,
  setSocket,
} from "./userSlice";

export const loginUser = (fields, role) => async (dispatch) => {
  dispatch(authRequest());

  await axios
    .post(`http://localhost:3000/${role}Login`, fields, {
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => {
        dispatch(authSuccess(response.data));
    })
    .catch((error) => {
        console.log(error);
      dispatch(getError(error.response.data.message || error.message));
    });

  //   if (result.data.role) {
  //     dispatch(authSuccess(result.data));
  //   } else {
  //     dispatch(authFailed(result.data));
  //   }
};

export const logoutUser = () => (dispatch) => {
  dispatch(authLogout());
};

export const getUserList = () => async (dispatch) => {
  try {
    const userList = await axios.get("http://localhost:3000/users");
    dispatch(getUserListDone(userList.data));
  } catch (error) {
    console.log(error);
  }
};

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
};

export const addStuff = (fields, address) => async (dispatch) => {
  dispatch(authRequest());

  try {
    const result = await axios.post(
      `http://localhost:3000/${address}Create`,
      fields,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (result.data.message) {
      dispatch(authFailed(result.data.message));
    } else {
      dispatch(stuffAdded(result.data));
    }
  } catch (error) {
    dispatch(authError(error));
  }
};

export const showSideBar = () => (dispatch) => {
  dispatch(isOpen());
};

export const OnlineUsers = (data) => (dispatch) => {
  dispatch(setOnlineUsers(data));
};

export const SocketConnection = (socket) => (dispatch) => {
  dispatch(setSocket(socket));
};
