import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  CardFooter,
  Input,
  Button,
  Typography,
  Textarea
} from "@material-tailwind/react";
import { getActivityList } from '../../../redux/activityRelated/activityHandle';
import AddGroupActivityModal from './AddGroupActivityModal';
import UpdateGroupActivityModal from './UpdateGroupActivityModal';
import DeleteGroupActivityModal from './DeleteGroupActivityModal';
import DetailGroupActivityModal from './DetailGroupActivityModal';

function ShowGroupActivity() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { activityList } = useSelector(state => state.activity);

  const [groupId, setGroupId] = useState(null)
  const [addGroupActivityModal, setAddGroupActivityModal] = useState(false);
  const [updateGroupActivityModal, setUpdateGroupActivityModal] = useState(false);
  const [deleteGroupActivityModal, setDeleteGroupActivityModal] = useState(false);
  const [detailGroupActivityModal, setDetailGroupActivityModal] = useState(false);

  useEffect(() => {
    dispatch(getActivityList())
  }, [])
  return <>
    <div className='p-9 flex flex-col gap-y-5 '>
      <Button class="bg-light-blue-600 text-white p-2 rounded-lg" onClick={() => setAddGroupActivityModal(true)}>Thêm nhóm hoạt động</Button>

      <table className='w-full min-w-full table-auto text-left'>
        <thead className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
          <tr>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">ID</th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              Nhóm hoạt động
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 "></th>
          </tr>
        </thead>
        <tbody>
          {activityList.map((item, index) =>
            <tr key={item._id} className="even:bg-blue-gray-50/50">
              <td className='p-4'>{index + 1}</td>
              <td className='p-4'>{item.group_activity}</td>
              <td className="p-4 flex gap-2">
              
                  <Button className="bg-green-700" onClick={() => {setDetailGroupActivityModal(true); setGroupId(activityList.find(activity => activity._id === item._id))}}>Chi tiết</Button>
                  
                
                
                  <Button className="bg-orange-500" onClick={() => {setUpdateGroupActivityModal(true); setGroupId(activityList.find(activity => activity._id === item._id))}}>Cập nhật</Button>
                  
                
                  <Button className="bg-red-700" onClick={() => {setDeleteGroupActivityModal(true); setGroupId(activityList.find(activity => activity._id === item._id))}}>Xóa</Button>
                

              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

        {addGroupActivityModal ? <AddGroupActivityModal onClose={() => setAddGroupActivityModal(false)}/> : ''}
        {updateGroupActivityModal ? <UpdateGroupActivityModal activity={groupId} onClose={() => setUpdateGroupActivityModal(false)}/> : ''}
        {deleteGroupActivityModal ? <DeleteGroupActivityModal activity={groupId} onClose={() => setDeleteGroupActivityModal(false)}/> : ''}
        {detailGroupActivityModal ? <DetailGroupActivityModal activity={groupId} onClose={() => setDetailGroupActivityModal(false)}/> : ''}
  </>


}

export default ShowGroupActivity