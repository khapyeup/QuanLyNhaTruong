import React from 'react'
import { useDispatch } from 'react-redux';
import { addStudent } from '../../../redux/studentRelated/studentHandle';
import {useForm} from "react-hook-form"
import { useNavigate } from 'react-router-dom';

const AddStudent = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm();
  const submitHandler = (e) => {
    console.log(e)
    alert("Thêm thành công")
    dispatch(addStudent(e))
    navigate('/admin/students/')
  }
  return (
    <>
      <div className="flex justify-center items-center">
        <div className='w-5/12 p-10'>
        <form className="bg-slate-300 flex flex-col gap-5 my-6 border p-10" onSubmit={handleSubmit(submitHandler)}>
        <input className='border p-2 rounded-lg shadow-lg' {...register("name", {required: "Không được bỏ trống tên đăng nhập"})} placeholder='Họ và tên' type="text" name="name"/>
        <input className='border p-2 rounded-lg shadow-lg'  {...register("age", {required: "Không được bỏ trống tuổi"})} type="number" name="age" placeholder='Tuổi'/>
        <select className='border p-2 rounded-lg shadow-lg'  {...register("class")} name="class">
          <option value="Lá">Lá</option>
          <option value="Mầm">Mầm</option>
          <option value="Chồi">Chồi</option>
        </select>
        <input className='border p-2 rounded-lg shadow-lg'  {...register("parentname", {required: "Không được bỏ trống tên phụ huynh"})} type="text" name="parentname" placeholder="Tên bố mẹ"/>
        {errors.name && <p className='text-red-800 font-bold'>* {errors.name.message}</p>}
        {errors.age && <p className='text-red-800 font-bold'>* {errors.age.message}</p>}
        {errors.age && <p className='text-red-800 font-bold'>* {errors.parentname.message}</p>}
        <button className="bg-slate-600 hover:bg-slate-400 text-white rounded-lg p-2" type="submit">Thêm học sinh</button>
      </form>
        </div>
      
      </div>
      
    </>
  )
}

export default AddStudent