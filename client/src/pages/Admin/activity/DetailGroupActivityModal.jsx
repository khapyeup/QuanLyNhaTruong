import { Button } from '@material-tailwind/react'
import {  useState } from 'react'
import Loading from '../../component/Loading'
import AddActivityModal from './AddActivityModal';
import UpdateActivityModal from './UpdateActivityModal';
import DeleteActivityModal from './DeleteActivityModal';
import { useGetActivityQuery } from '../../../redux/activityRelated/activityApiSlice';
import { IoClose } from "react-icons/io5";

const DetailGroupActivityModal = ({ onClose, activity }) => {

   const {data: subActivity, isLoading: isSubActivityLoading, isError} = useGetActivityQuery(activity._id);
   console.log(subActivity)
    const [activityId, setActivityId] = useState(null)
    const [addActivityModal, setAddActivityModal] = useState(false);
    const [updateActivityModal, setUpdateActivityModal] = useState(false);
    const [deleteActivityModal, setDeleteActivityModal] = useState(false);

    if (isError) return <p>Lỗi</p>
    return (
        <>
            <div className='inset-0 fixed flex justify-center items-center bg-black/20'>
            {isSubActivityLoading ? <Loading size={12}/> : <div className='w-4/5 h-4/5 p-4 flex flex-col gap-y-5 bg-white overflow-y-auto' >
                
                <div className='flex justify-between '>
                    <h1 className='text-2xl font-bold'>Chi tiết nhóm hoạt động</h1>
                    <button onClick={onClose} className='p-2 bg-black text-white hover:bg-red-500'><IoClose /></button>
                    
                </div>
                <Button class="bg-light-blue-600 text-white p-2 rounded-lg" onClick={() => setAddActivityModal(true)}>Thêm hoạt động con</Button>

                <table className='w-full  table-auto text-left'>
                    <thead className="border-b border-blue-gray-100 bg-blue-gray-50 p-2">
                        <tr>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">ID</th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                Hoạt động con
                            </th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 "></th>
                        </tr>
                    </thead>
                    <tbody>
                        {subActivity.activity.map((item, index) =>
                            <tr key={item._id} className="even:bg-blue-gray-50/50">
                                <td className='p-4'>{index + 1}</td>
                                <td className='p-4'>{item.name}</td>
                                <td className="p-4 flex gap-2">

                                    <Button className="bg-orange-500" onClick={() => { setUpdateActivityModal(true); setActivityId(item) }}>Cập nhật</Button>


                                    <Button className="bg-red-700" onClick={() => { setDeleteActivityModal(true); setActivityId(item) }}>Xóa</Button>


                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>}
                
            </div>

            {/* activityId là activity.activity
            activity là group_activity */}
            {addActivityModal ? <AddActivityModal activity={activity} onClose={() => setAddActivityModal(false)} /> : ''}
            {updateActivityModal ? <UpdateActivityModal activity={activityId} group={activity} onClose={() => setUpdateActivityModal(false)} /> : ''}
            {deleteActivityModal ? <DeleteActivityModal activity={activityId} group={activity} onClose={() => setDeleteActivityModal(false)} /> : ''}
        </>

    )
}

export default DetailGroupActivityModal