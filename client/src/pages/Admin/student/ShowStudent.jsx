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
  Typography
} from "@material-tailwind/react";
import { updateStudent } from '../../../redux/studentRelated/studentHandle';

function ShowStudent() {
  const [sclass, setSclass] = useState('');
  const [parentname, setparentname] = useState('');
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { studentList, error, response } = useSelector((state) => state.student);
  // const { classList } = useSelector(state => state.sclass);

  const handleEditClick = (e) => {
    const form = e.target;
    
    const id = form.id.value;
    const name = form.name.value;
    const age = form.age.value;

    dispatch(updateStudent(id, { name, age, class: sclass, parentname }))
    if (response || error)
      alert(response.message)
  }

  const handleAddStudent = () => {
    return navigate("/admin/students/add")
  }

  useEffect(() => {
    dispatch(getClassList());
    dispatch(getStudentList());
  }, [])
  return <>
    <div className='p-9'>
      <button class="bg-slate-600 hover:bg-slate-400 p-2 rounded-lg" onClick={handleAddStudent}>Thêm học sinh</button>

      <table className='my-3 w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400 border-collapse text-center'>
        <thead className="text-xs text-gray-700 uppercase bg-gray-400 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3">ID</th>
            <th className="px-6 py-3">
              Họ và tên
            </th>
            <th className="px-6 py-3">
              Tuổi
            </th>
            <th className="px-6 py-3">Lớp</th>
            <th className="px-6 py-3 ">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {studentList.map((student, index) =>
            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-slate-400">
              <td className='px-6 py-4'>{index + 1}</td>
              <td className='px-6 py-4'>{student.name}</td>
              <td className='px-6 py-4'>{student.age}</td>
              <td className='px-6 py-4'>{student.class}</td>
              <td className="flex flex-rol items-center px-1 py-4 justify-between">
                <Link to={`/admin/students/view/${student._id}`}>Chi tiết</Link>
                <Modal buttonData={"Chỉnh sửa"} buttonColor={"bg-yellow-500 "}>
                  <form onSubmit={handleEditClick}>
                    <Card className="mx-auto w-full max-w-[24rem]">
                      <CardBody className="flex flex-col gap-4">
                        <Typography variant="h4" color="blue-gray">
                          Nhập thông tin chỉnh sửa
                        </Typography>

                        <input type='text' name="id" readOnly hidden value={student._id}></input>
                        <Input required type='text' name="name" label="Họ và tên" size="lg" value={student.name} />

                        <Input required name="age" type="number" label="Tuổi" size="lg" value={student.age} />

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
                <Link to={`/admin/students/delete/${student._id}`}>Xóa</Link>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

  </>


}

export default ShowStudent