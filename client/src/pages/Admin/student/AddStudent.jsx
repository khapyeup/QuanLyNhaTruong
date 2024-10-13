import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addStudent } from '../../../redux/studentRelated/studentHandle';
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { getParentList } from '../../../redux/parentRelated/parenHandle';
import { getClassList } from '../../../redux/sclassRelated/sclassHandle';
import { Button, Typography } from '@material-tailwind/react';

const AddStudent = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm();

  const {parentList} = useSelector(state => state.parent)
  const {classList} = useSelector(state => state.sclass)
  
  const submitHandler = (e) => {
    dispatch(addStudent(e))
    navigate('/admin/students/')
  }

  useEffect(() => {
    dispatch(getParentList());
    dispatch(getClassList());
  }, [])
  return (
    <>
      <div className="flex justify-center items-center bg-blue-gray-300 top-0">
        <div className='w-full lg:w-1/2 p-5 bg-white'>
        <Typography variant='h4'>Thêm học sinh</Typography>
          <form className="text-black flex flex-col gap-5 my-6 px-10" onSubmit={handleSubmit(submitHandler)}>
            <label htmlFor='name'>Họ và tên</label>
            <input className='border p-2 rounded-lg shadow-lg' {...register("name", { required: "Không được bỏ trống họ và tên" })} placeholder='Họ và tên' type="text" name="name" id='name'/>
            <label htmlFor='dob'>Ngày sinh</label>
            <input className='border p-2 rounded-lg shadow-lg'  {...register("dob", { required: "Không được bỏ trống tuổi" })} type="date" name="dob" placeholder='Ngày sinh' id="dob"/>
            
            <label htmlFor='class_id'>Lớp</label>
            <select className='border p-2 rounded-lg shadow-lg'  {...register("class_id")} name="class_id" id='class_id'>
             {classList ? classList.map(el => 
              <option value={el._id} key={el.class_id}>{el.name}</option>
             ) : ''}
            </select>
            
            <label htmlFor='user_id'>Tên tài khoản phụ huynh</label>
            <select className='border p-2 rounded-lg shadow-lg'  {...register("user_id")} name="user_id" id="user_id">
             {parentList ? parentList.map(el => 
              <option value={el._id} key={el._id}>{el.username}</option>
             ) : ''}
            </select>

            <label htmlFor='gender'>Giới tính</label>
            <select required className='border p-2 rounded-lg shadow-lg'  {...register("gender")} name="gender" id="gender">
             <option value="Nam">Nam</option>
             <option value="Nữ">Nữ</option>
            </select>
            
            <label htmlFor='address'>Địa chỉ</label>
            <input className='border p-2 rounded-lg shadow-lg'  {...register("address", { required: "Không được bỏ trống địa chỉ" })} type="text" name="address" placeholder='Địa chỉ' id="address"/>

            {errors.name && <p className='text-red-800 font-bold'>* {errors.name.message}</p>}
            {errors.age && <p className='text-red-800 font-bold'>* {errors.age.message}</p>}
            {errors.age && <p className='text-red-800 font-bold'>* {errors.parentname.message}</p>}
            <Button className=" hover:bg-slate-400 text-white rounded-lg p-2" type="submit">Thêm học sinh</Button>
            <Button className="bg-cyan-700 text-white rounded-lg p-2" onClick={() => navigate('/admin/students/')}>Hủy bỏ</Button>
          </form>
        </div>

      </div>

    </>
  )
}

export default AddStudent