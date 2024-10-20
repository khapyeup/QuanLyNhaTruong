// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'



// const ShowActivity = () => {
//     const dispatch = useDispatch();
    
//     const {activityList} = useSelector(state => state.activity);


//     const handleAddActivity = () => {
//         dispatch(addActivity());
//     }

//     useEffect(() => {
//         dispatch(getActivityList());
//     }, [])
//     return (
//         <div className='p-9 flex flex-col gap-y-5'>
//             <Button class="bg-light-blue-600 text-white p-2 rounded-lg" onClick={handleAddActivity}>Thêm hoạt động</Button>

//             <table className='w-full min-w-full table-auto text-left'>
//                 <thead className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
//                     <tr>
//                         <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">ID</th>
//                         <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
//                             Tên hoạt động
//                         </th>
                        

//                         <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 "></th>
//                     </tr>
//                 </thead>
//                 <tbody>
                    
//                 </tbody>
//             </table>
//         </div>
//     )
// }

// export default ShowActivity

import React from 'react'

const ShowActivity = () => {
  return (
    <div>ShowActivity</div>
  )
}

export default ShowActivity