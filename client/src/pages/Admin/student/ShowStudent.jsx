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




function ShowStudent() {
  const [sclass, setSclass] = useState('');
  const [parentname, setparentname] = useState('');
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { studentList, error, response, message } = useSelector((state) => state.student);
  // const { classList } = useSelector(state => state.sclass);

  const handleEditClick = (e) => {
    const form = e.target;

    const id = form.id.value;
    const name = form.name.value;
    const age = form.age.value;

    dispatch(updateStudent(id, { name, age, class: sclass, parentname }))
    if (response || error)
      alert(response.message)
    else
      alert("Sửa thành công");
  }

    

  const handleAddStudent = () => {
    return navigate("/admin/students/add")
  }

  const handleDelete = (_id) => {
    dispatch(deleteStudent(_id));
    
  }

  useEffect(() => {
    dispatch(getClassList());
    dispatch(getStudentList());
  }, [])
  return <>
    {message ? <p className='w-full p-2 bg-green-500'>{message}</p> : ''}
    {/* <div>
        <Typography variant='h5'>
          Thông báo
        </Typography>
        <table className="w-full min-w-full table-auto text-left">
          <thead>
            <tr>
              {tableHead.map((head) => (
                <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography variant='small' color='blue-gray' className='font-normal leading-none opacity-75'>
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableRow.map(({ title, date }, index) => (
              <tr key={index} className="even:bg-blue-gray-50/50">
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {index + 1}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {title}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {date.substring(0, 10)}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                    Xem
                  </Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}




    <div className='p-9 flex flex-col gap-y-5'>
      <Button class="bg-blue-600 text-white p-2 rounded-lg" onClick={handleAddStudent}>Thêm học sinh</Button>

      <table className='w-full min-w-full table-auto text-left'>
        <thead className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
          <tr>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">ID</th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              Họ và tên
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              Tuổi
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Lớp</th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 "></th>
          </tr>
        </thead>
        <tbody>
          {studentList.map((student, index) =>
            <tr key={index} className="even:bg-blue-gray-50/50">
              <td className='p-4'>{index + 1}</td>
              <td className='p-4'>{student.name}</td>
              <td className='p-4'>{student.age}</td>
              <td className='p-4'>{student.class}</td>
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
                        <Input required type='text' name="name" label="Họ và tên" size="lg" />

                        <Input required name="age" type="number" label="Tuổi" size="lg" />

                        <Select required name="sclass" label="Lớp" size="lg" onChange={(val) => setSclass(val)}>
                          <Option value="A">A</Option>
                        </Select>

                        <Select required name="parentname" label="Phụ huynh" size="lg" onChange={(val) => setparentname(val)}>
                          <Option value="Phụ huynh A">Phụ huynh A</Option>
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