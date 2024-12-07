import { apiSlice } from "../apiSlice";

const complaintApiSlice = apiSlice.injectEndpoints(
    {endpoints: builder => ({
        getAllComplaints: builder.query({
            query: () => '/complaints',
            providesTags: ['Complaint']
        }),
        addComplaint: builder.mutation({
            query: (data) => ({
                url: `/complaints`,
                method: "POST",
                body: data 
            }),
            invalidatesTags: ['ComplaintUser']
        }),
        updateComplaint: builder.mutation({
            query: ({id, ...updateData}) => ({
                url: `/complaints/${id}`,
                method: "PUT",
                body: updateData 
            }),
            invalidatesTags: ['Complaint']
        }),
        getComplaintsByUser: builder.query({
            query: (userId) => `/complaints/user/${userId}`,
            providesTags: ['ComplaintUser']
        })
    })}
)

export const {useGetAllComplaintsQuery, useAddComplaintMutation, useUpdateComplaintMutation, useGetComplaintsByUserQuery} = complaintApiSlice