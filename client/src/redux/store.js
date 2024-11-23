import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userRelated/userSlice";
import { studentReducer } from "./studentRelated/studentSlice";
import { noticeReducer } from "./noticeRelated/noticeSlice";
import { sclassReducer } from "./sclassRelated/sclassSlice";
import { teacherReducer } from "./teacherRelated/teacherSlice";
import { parentReducer } from "./parentRelated/parentSlice";
import { activityReducer } from "./activityRelated/activitySlice";
import { financeReducer } from "./financeRelated/financeSlice";
import { chatReducer } from "./chatRelated/chatSlice";

import { apiSlice } from "./apiSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    student: studentReducer,
    teacher: teacherReducer,
    notice: noticeReducer,
    // complain: complainReducer,
    sclass: sclassReducer,
    parent: parentReducer,
    activity: activityReducer,
    finance: financeReducer,
    chat: chatReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).prepend().concat(apiSlice.middleware),
});

export default store;
