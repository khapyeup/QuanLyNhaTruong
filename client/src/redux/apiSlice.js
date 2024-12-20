import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  tagTypes:['Parent', 'Teacher', 'Student', 'Notice', 'SubActivity', 'GroupActivity', 'Sclass', 'Progress','Fee','Payment','FeeRemindSetting','Complaint', 'ComplaintUser'],
  endpoints: () => ({})
});

