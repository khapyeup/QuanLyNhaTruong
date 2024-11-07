import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from "react-router-dom";
import { getStudentList } from '../../../redux/studentRelated/studentHandle';
import Modal from '../../component/Modal';
import { getClassList } from '../../../redux/sclassRelated/sclassHandle';
import {
  Card,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
  Select,
  Option,
  CardHeader
} from "@material-tailwind/react";
import { updateStudent, deleteStudent } from '../../../redux/studentRelated/studentHandle';
import { getParentList } from '../../../redux/parentRelated/parenHandle';
import AddStudent from './AddStudent'
import UpdateStudent from './UpdateStudent';



function ShowStudent() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const { studentList, error, response } = useSelector((state) => state.student);
  

  const [student, setStudent] = useState(null);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [search, setSearch] = useState('');

  const dispatch = useDispatch()



  const handleAddModal = () => {
    setOpenAddModal(!openAddModal)
  }

  const handleAddStudent = () => {
    handleAddModal();
  }

  const handleDelete = (_id) => {
    dispatch(deleteStudent(_id));
  }

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase())
    console.log(search)
  }

  useEffect(() => {
    dispatch(getClassList());
    dispatch(getStudentList());
    dispatch(getParentList());
  }, [])
  return <>
    <AddStudent open={openAddModal} showModal={handleAddModal} />

    <div className='p-9 flex flex-col gap-y-5'>
      <div className='flex flex-col gap-2 lg:flex-row lg:justify-between'>
        <Button onClick={handleAddStudent}>Thêm học sinh</Button>
        <input className='w-1/5 border-2 border-black p-1 rounded-lg' placeholder='Tìm kiếm' onChange={handleSearch} />

      </div>

      <table className='w-full min-w-full table-auto text-left'>
        <thead className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
          <tr>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">ID</th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              Họ và tên
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              Ngày sinh
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Giới tính</th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Lớp</th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 "></th>
          </tr>
        </thead>
        <tbody>
          {studentList.filter((item) => {
            return search.toLowerCase() === '' ? item : (item.name.toLowerCase().includes(search) || item.class_id.name.toLowerCase().includes(search))
          }).map((student, index) =>
            <tr key={index} className="even:bg-blue-gray-50/50">
              <td className='p-4'>{index + 1}</td>
              <td className='p-4'>{student.name}</td>
              <td className='p-4'>{new Date(student.dob).toLocaleDateString()}</td>
              <td className='p-4'>{student.gender}</td>
              <td className='p-4'>{student.class_id.name}</td>
              <td className="p-4 justify-evenly flex">

                <Link to={`/admin/students/view/${student._id}`}>
                  <Button className="bg-green-700">Chi tiết</Button>
                </Link>
                <Button onClick={() => {setStudent(student); setUpdateModal(true)}}>Chỉnh sửa</Button>
                <Modal buttonData={"Xóa"} buttonColor={"bg-red-500"}>
                  <Card>

                    <CardBody>
                      <Typography>Xác nhận xóa?</Typography>
                      <div className='flex gap-5'>
                        <Button className='bg-red-400' onClick={() => handleDelete(student._id)}>OK</Button>
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
    
    {updateModal ? <UpdateStudent student={student} onClose={() => setUpdateModal(false)}/> : ''}
  </>


}

export default ShowStudent