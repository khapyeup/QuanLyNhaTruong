import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addStudent } from '../../../redux/studentRelated/studentHandle';
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { getParentList } from '../../../redux/parentRelated/parenHandle';
import { getClassList } from '../../../redux/sclassRelated/sclassHandle';
import { Button, Card, CardBody, Dialog, Input, Typography, Select, Option } from '@material-tailwind/react';

const AddStudent = ({ open, showModal }) => {
  const dispatch = useDispatch()

  const { register, handleSubmit, formState: { errors } } = useForm();

  const { message } = useSelector(state => state.student);
  const { parentList } = useSelector(state => state.parent)
  const { classList } = useSelector(state => state.sclass)

  const [imageFileName, setImageFileName] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const submitHandler = (e) => {
    const newStudentData = { ...e, avatar: imageFileName };
    
    dispatch(addStudent(newStudentData))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileName(file.name);
    }
  }

  useEffect(() => {
    dispatch(getParentList());
    dispatch(getClassList());
  }, [])
  return (
    <>
      <Dialog open={open} handler={showModal}>

        <Card>
          <CardBody className='w-50'>


            <Typography variant='h4'>Thêm học sinh</Typography>


            <form className=" flex flex-col md:gap-2" onSubmit={handleSubmit(submitHandler)}>

              <Input label='Họ và tên' className='border p-2 rounded-lg shadow-lg' {...register("name", { required: "Không được bỏ trống họ và tên" })} placeholder='Họ và tên' type="text" name="name" id='name' />


              <Input label='Mã định danh' className='border p-2 rounded-lg shadow-lg' {...register("student_id", { required: "Không được bỏ trống mã định danh", maxLength: 12, minLength: 12, pattern: /^\d+$/ })} placeholder='Mã định danh' type="text" name="student_id" id='student_id' />
              {errors.student_id?.type == 'required' && <p className='text-red-800 font-bold'>* {errors.student_id.message}</p>}
              {errors.student_id?.type == 'pattern' && <p className='text-red-800 font-bold'>* Mã định danh chỉ có số</p>}
              {errors.student_id?.type == 'maxLength' && <p className='text-red-800 font-bold'>* Mã định danh có tối đa 12 số</p>}
              {errors.student_id?.type == 'minLength' && <p className='text-red-800 font-bold'>* Mã định danh có 12 số</p>}


              <Input label='Ngày sinh' className='border p-2 rounded-lg shadow-lg'  {...register("dob", { required: "Không được bỏ trống tuổi" })} type="date" name="dob" placeholder='Ngày sinh' id="dob" />

              <label>Chọn lớp</label>
              <select className='border p-2 rounded-lg shadow-lg'  {...register("class_id")} name="class_id" >
                {classList ? classList.map(el =>
                  <option value={el._id} key={el._id}>{el.name}</option>
                ) : ''}
              </select>
              <label>Chọn tài khoản phụ huynh</label>
              <select className='border p-2 rounded-lg shadow-lg'  {...register("user_id")} name="user_id" id="user_id">
                {parentList ? parentList.map(el =>
                  <option value={el._id} key={el.username}>{el.username}</option>
                ) : ''}
              </select>

              <label>Chọn giới tính</label>
              <select className='border p-2 rounded-lg shadow-lg'  {...register("gender", { required: "Chưa chọn giới tính" })} name="gender" id="gender">
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>


              <Input label='Địa chỉ'  {...register("address", { required: "Không được bỏ trống địa chỉ" })} type="text" name="address" placeholder='Địa chỉ' id="address" />



              <Input onChange={handleFileChange} type='file' label='Ảnh đại diện' name='avatar' required />

              {errors.name && <p className='text-red-800 font-bold'>* {errors.name.message}</p>}
              {errors.age && <p className='text-red-800 font-bold'>* {errors.age.message}</p>}
              {errors.parentname && <p className='text-red-800 font-bold'>* {errors.parentname.message}</p>}
              {errors.avatarUrl && <p className='text-red-800 font-bold'>* {errors.avatarUrl.message}</p>}

              <div className='flex flex-col md:flex-row justify-evenly'>
                <Button className=" hover:bg-slate-400 text-white rounded-lg p-2" type="submit">Thêm học sinh</Button>
                <Button className="bg-cyan-700 text-white rounded-lg p-2" onClick={showModal}>Hủy bỏ</Button>
              </div>

            </form>
          </CardBody>
        </Card>




      </Dialog>


    </>
  )
}

export default AddStudent