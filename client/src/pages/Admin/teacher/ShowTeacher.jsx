import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { getTeacherList, updateTeacher, deleteTeacher } from '../../../redux/teacherRelated/teacherHandle';
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


function ShowTeacher() {
  const [class_id, setClass_Id] = useState('');
  const [gender, setGender] = useState('');
  const [subject, setSubject] = useState('');

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { teacherList, error, response, message } = useSelector((state) => state.teacher);
  const { classList } = useSelector(state => state.sclass);
  const subjectList = ['Toán', 'Tiếng việt', 'Tập viết', 'Tập vẽ', 'Âm nhạc', 'Tiếng anh']

  const handleEditClick = (e) => {
    e.preventDefault()
    const form = e.target;
    const id = form.id.value;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;

    if (gender === '' || class_id === '' || subject === '')
      alert("Nhập đủ dữ liệu")
    else {
      dispatch(updateTeacher(id, { name, email, phone, class_id, gender, subject }))
      if (response || error)
        alert(response.message)
      

    }

    

  }

  const handleAddTeacher = () => {
    return navigate("/admin/teachers/add")
  }

  const handleDelete = (_id) => {
    dispatch(deleteTeacher(_id));
    window.location.reload();
  }

  useEffect(() => {
    dispatch(getClassList());
    dispatch(getTeacherList());
  }, [])
  return <>
    
    


    <div className='p-9 flex flex-col gap-y-5'>
      <Button class="bg-light-blue-600 text-white p-2 rounded-lg" onClick={handleAddTeacher}>Thêm giáo viên</Button>

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

            </th>
          </tr>
        </thead>
        <tbody>
          {teacherList.map((teacher, index) =>
            <tr key={index} className="even:bg-blue-gray-50/50">
              <td className='p-4'>{index + 1}</td>
              <td className='p-4'>{teacher.name}</td>
              <td className='p-4'>{teacher.gender}</td>
              <td className="p-4 justify-evenly flex">
                <Link to={`/admin/teachers/view/${teacher._id}`}>
                  <Button className="bg-green-700">Chi tiết</Button>
                </Link>
                <Modal buttonData={"Chỉnh sửa"} buttonColor={"bg-orange-500 "}>
                  <form onSubmit={handleEditClick}>
                  {message ? <p className='w-full p-2 bg-green-500'>{message}</p> : ''}
                    <Card className="mx-auto w-full max-w-[24rem]">
                      <CardBody className="flex flex-col gap-4">
                        <Typography variant="h4" color="blue-gray">
                          Nhập thông tin chỉnh sửa
                        </Typography>

                        <input type='text' name="id" readOnly hidden value={teacher._id}></input>
                        <Input required type='text' name="name" label="Họ và tên" size="lg" defaultValue={teacher.name} />

                        <Input required name="email" type="email" label="Email" size="lg" defaultValue={teacher.email} />

                        <Input required name="phone" type="text" label="Điện thoại" size="lg" defaultValue={teacher.phone} />

                        <Select required name="gender" label="Giới tính" size="lg" onChange={(val) => setGender(val)}>
                          <Option value="Nam">Nam</Option>
                          <Option value="Nữ">Nữ</Option>
                        </Select>

                        <Select required name="class_id" label="Chủ nhiệm lớp" size="lg" onChange={(val) => setClass_Id(val)}>
                          {classList ? classList.map(el =>
                            <Option value={el._id} key={el.class_id}>{el.name}</Option>
                          ) : ''}
                        </Select>

                        <Select required name="subject" label="Môn" size="lg" onChange={(val) => setSubject(val)}>
                          {subjectList.map(el =>
                            <Option value={el} key={el}>{el}</Option>
                          )}
                        </Select>




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
                        <Button className='bg-red-400' onClick={() => handleDelete(teacher._id)}>OK</Button>
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

export default ShowTeacher;