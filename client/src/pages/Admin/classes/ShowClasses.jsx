import React, { useEffect } from 'react'
import { Button, Card, CardFooter, CardBody, Typography, Input } from '@material-tailwind/react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getClassList, updateClass } from '../../../redux/sclassRelated/sclassHandle';
import Modal from '../../component/Modal';


function ShowClasses() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {classList} = useSelector(state => state.sclass);

  const handleAddClass = () => {
    navigate('/admin/classes/add')
  }

  const handleEditClick = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    dispatch(updateClass(e.target.id.value, {name}));
  }

  useEffect(() => {
    dispatch(getClassList());
  },[])
  return (
    <div className='p-9 flex flex-col gap-y-5'>
      <Button class="bg-light-blue-600 text-white p-2 rounded-lg" onClick={handleAddClass}>Thêm lớp</Button>

      <table className='w-full min-w-full table-auto text-left'>
        <thead className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
          <tr>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">ID</th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              Tên lớp
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 "></th>
          </tr>
        </thead>
        <tbody>
          {classList.map((sclass, index) =>
            <tr key={sclass._id}>
              <td className='p-4'>{index + 1}</td>
              <td className='p-4'>{sclass.name}</td>
              <td className='p-4 gap-2 justify-end flex'>
               
                <Modal buttonData={"Chỉnh sửa"} buttonColor={"bg-orange-500 "}>
                  <form onSubmit={handleEditClick}>
                    <Card className="mx-auto w-full max-w-[24rem]">
                      <CardBody className="flex flex-col gap-4">
                        <Typography variant="h4" color="blue-gray">
                          Nhập thông tin chỉnh sửa
                        </Typography>

                        <input type='text' name="id" readOnly hidden value={sclass._id}></input>
                        <Input required type='text' name="name" label="Tên" size="lg" defaultValue={sclass.name} />

                      </CardBody>
                      <CardFooter className="pt-0">
                        <Button type='submit' variant="gradient" fullWidth>
                          Chỉnh sửa
                        </Button>
                      </CardFooter>
                    </Card>
                  </form>
                </Modal>
                
                
                {/* <Modal buttonData={"Xóa"} buttonColor={"bg-red-500"}>
                  <Card>
                    <CardBody>
                      <Typography>Xác nhận xóa?</Typography>
                      <div className='flex gap-5'>
                        <Button className='bg-red-400' onClick={() => handleDelete(activity._id)}>OK</Button>
                        <Button onClick={() => window.location.reload()}>Hủy</Button>
                      </div>
                    </CardBody>
                  </Card>
                </Modal> */}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ShowClasses