import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTeacherList } from '../../../redux/teacherRelated/teacherHandle';
import { getClassList } from '../../../redux/sclassRelated/sclassHandle';
import { Button, Dialog } from '@material-tailwind/react'
import AddTeacher from './AddTeacher';
import { Link } from 'react-router-dom';
import UpdateTeacher from './UpdateTeacher';
import DeleteTeacher from './DeleteTeacher';


function ShowTeacher() {

  const dispatch = useDispatch()

  const [teacher, setTeacher] = useState(null)
  const [addModal, setAddModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const { teacherList } = useSelector((state) => state.teacher);
  const { classList } = useSelector(state => state.sclass);

  useEffect(() => {
    dispatch(getClassList());
    dispatch(getTeacherList());
  }, [dispatch])
  return <>

    <div className='p-9 flex flex-col gap-y-5'>
      <Button onClick={() => setAddModal(true)} class="bg-light-blue-600 text-white p-2 rounded-lg">Thêm giáo viên</Button>
      <table className='w-full min-w-full table-auto text-left'>
        <thead className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
          <tr>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">ID</th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              Họ và tên
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              Giới tính
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              Chủ nhiệm lớp
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">

            </th>
          </tr>
        </thead>
        <tbody>
          {teacherList.map((teacher, index) =>
            <tr key={index} className="even:bg-blue-gray-50/50">
              <td className='p-4'>{index + 1}</td>
              <td className='p-4'>{teacher.teacherInfo.name}</td>
              <td className='p-4'>{teacher.teacherInfo.gender}</td>
              <td className='p-4'>{teacher.teacherInfo.class.name}</td>
              <td className="p-4 gap-5 flex">
                <Link to={`/admin/teachers/${teacher._id}`}><Button className="bg-green-700">Chi tiết</Button></Link>
                <Button onClick={() => {setUpdateModal(true); setTeacher(teacher)}}>Chỉnh sửa</Button>
                <Button onClick={() => {setDeleteModal(true); setTeacher(teacher)}} className="bg-red-700">Xóa</Button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    
    {/*Add Modal */}
    <Dialog open={addModal} handler={() => setAddModal(false)} size='sm'>
      <AddTeacher open={() => setAddModal(false)}/>
    </Dialog>
    {/*Update Modal */}
    <Dialog open={updateModal} handler={() => setUpdateModal(false)} size='sm'>
      <UpdateTeacher teacher={teacher} open={() => setUpdateModal(false)}/>
    </Dialog>
     {/*Delete Modal */}
     <Dialog open={deleteModal} handler={() => setDeleteModal(false)} size='sm'>
      <DeleteTeacher teacher={teacher} open={() => setDeleteModal(false)}/>
    </Dialog>
  </>


}

export default ShowTeacher;