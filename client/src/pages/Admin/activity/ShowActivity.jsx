import React, { useEffect } from 'react'
import Modal from '../../component/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, CardBody, CardFooter, Typography, Input } from '@material-tailwind/react'
import { useNavigate } from 'react-router-dom'

import { updateActivity ,getActivityList, deleteActivity } from '../../../redux/activityRelated/activityHandle'


const ShowActivity = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { activityList } = useSelector(state => state.activity);


  const handleAddActivity = () => {
    navigate('/admin/activities/add');
  }

  const handleEditClick = (e) => {
    const activity_name = e.target.activity_name.value;
    dispatch(updateActivity(e.target.id.value , {activity_name}));
  }

  const handleDelete = (id) => {
    dispatch(deleteActivity(id));
    window.location.reload();
  }

  useEffect(() => {
    dispatch(getActivityList());
  }, [])
  return (
    <div className='p-9 flex flex-col gap-y-5'>
      <Button class="bg-light-blue-600 text-white p-2 rounded-lg" onClick={handleAddActivity}>Thêm hoạt động</Button>

      <table className='w-full min-w-full table-auto text-left'>
        <thead className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
          <tr>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">ID</th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              Tên hoạt động
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 "></th>
          </tr>
        </thead>
        <tbody>
          {activityList.map((activity, index) =>
            <tr key={activity._id}>
              <td className='p-4'>{index + 1}</td>
              <td className='p-4'>{activity.activity_name}</td>
              <td className='p-4 gap-2 justify-end flex'>
               
                <Modal buttonData={"Chỉnh sửa"} buttonColor={"bg-orange-500 "}>
                  <form onSubmit={handleEditClick}>
                    <Card className="mx-auto w-full max-w-[24rem]">
                      <CardBody className="flex flex-col gap-4">
                        <Typography variant="h4" color="blue-gray">
                          Nhập thông tin chỉnh sửa
                        </Typography>

                        <input type='text' name="id" readOnly hidden value={activity._id}></input>
                        <Input required type='text' name="activity_name" label="Teen" size="lg" defaultValue={activity.activity_name} />

                      </CardBody>
                      <CardFooter className="pt-0">
                        <Button type='submit' variant="gradient" fullWidth>
                          Chỉnh sửa
                        </Button>
                      </CardFooter>
                    </Card>
                  </form>
                </Modal>
                
                
                <Modal buttonData={"Xóa"} buttonColor={"bg-red-500"}>
                  <Card>

                    <CardBody>
                      <Typography>Xác nhận xóa?</Typography>
                      <div className='flex gap-5'>
                        <Button className='bg-red-400' onClick={() => handleDelete(activity._id)}>OK</Button>
                        <Button onClick={() => window.location.reload()}>Hủy</Button>
                      </div>

                    </CardBody>
                  </Card>
                </Modal>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ShowActivity

