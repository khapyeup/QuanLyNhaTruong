import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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



function ShowStudent() {

  const { studentList, error, response, message } = useSelector((state) => state.student);
  const { classList } = useSelector(state => state.sclass);
  const { parentList } = useSelector(state => state.parent)

  const [class_id, setClass_Id] = useState('');
  const [user_id, setUser_Id] = useState('');
  const [gender, setGender] = useState('');
  const [openAddModal, setOpenAddModal] = useState(false);
  const [search, setSearch] = useState('');

  const dispatch = useDispatch()
  const navigate = useNavigate()



  const handleAddModal = () => {
    setOpenAddModal(!openAddModal)
  }

  const handleEditClick = (e) => {
    e.preventDefault();
    const form = e.target;
    const id = form.id.value;
    const student_id = form.student_id.value;
    const name = form.name.value;
    const dob = form.dob.value;
    const address = form.address.value;

    console.log({ name,student_id ,dob, address, gender, user_id, class_id })
    dispatch(updateStudent(id, { name,student_id ,dob, address, gender, user_id, class_id }))
    if (response || error)
      alert(response.message)
    else
      alert("Sửa thành công");
  }

  const handleAddStudent = () => {
    handleAddModal();
    console.log(openAddModal);

  }

  const handleDelete = (_id) => {
    dispatch(deleteStudent(_id));
    window.location.reload();
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
    {message ? <p className='w-full p-2 bg-green-500'>{message}</p> : ''}

    <AddStudent open={openAddModal} showModal={handleAddModal} />

    <div className='p-9 flex flex-col gap-y-5'>
      <div className='flex flex-col gap-2 lg:flex-row lg:justify-between'>
        <Button class="bg-light-blue-600 text-white p-2 rounded-lg" onClick={handleAddStudent}>Thêm học sinh</Button>
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
              <td className='p-4'>{student.dob}</td>
              <td className='p-4'>{student.gender}</td>
              <td className='p-4'>{student.class_id.name}</td>
              <td className="p-4 justify-evenly flex">

                <Link to={`/admin/students/view/${student._id}`}>
                  <Button className="bg-green-700">Chi tiết</Button>
                </Link>
                <Modal buttonData={"Chỉnh sửa"} buttonColor={"bg-orange-500 "}>
                  <form onSubmit={handleEditClick}>
                    <Card className="mx-auto w-full max-w-[24rem]">
                      <CardBody className="flex flex-col gap-4">
                        <Typography variant="h4" color="blue-gray">
                          Nhập thông tin chỉnh sửa
                        </Typography>

                        <input type='text' name="id" readOnly hidden value={student._id}></input>
                        
                        <Input required type='text' name="name" label="Họ và tên" size="lg" defaultValue={student.name} />

                        <Input type='text' name='student_id' label='Mã định danh' size='lg' defaultValue={student.student_id} maxLength={12} minLength={12}/>

                        <Input required name="dob" type="date" label="Ngày sinh" size="lg" defaultValue={student.dob} />

                        <Select required name="gender" label="Giới tính" size="lg" onChange={(val) => setGender(val)} >
                          <Option value="Nam">Nam</Option>
                          <Option value="Nữ">Nữ</Option>
                        </Select>

                        <Select required name="class_id" label="Lớp" size="lg" onChange={(val) => setClass_Id(val)} >
                          {classList ? classList.map(el =>
                            <Option value={el._id} key={el._id}>{el.name}</Option>
                          ) : ''}
                        </Select>

                        <Select required name="user_id" label="Phụ huynh" size="lg" onChange={(val) => setUser_Id(val)} >
                          {parentList ? parentList.map(el =>
                            <Option value={el._id} key={el._id}>{el.username}</Option>
                          ) : ''}
                        </Select>

                        <Input required name="address" type="text" label="Địa chỉ" size="lg" defaultValue={student.address} />


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

  </>


}

export default ShowStudent