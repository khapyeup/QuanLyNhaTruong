import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://quanlynhatruong.onrender.com" }),
  tagTypes:['Parent', 'Teacher', 'Student', 'Notice', 'SubActivity', 'GroupActivity', 'Sclass', 'Progress','Fee','Payment','FeeRemindSetting','Complaint', 'ComplaintUser'],
  endpoints: () => ({})
});

