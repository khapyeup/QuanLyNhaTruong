import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addTeacher } from '../../../redux/teacherRelated/teacherHandle';
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { getClassList } from '../../../redux/sclassRelated/sclassHandle';
import { Button, Typography } from '@material-tailwind/react';

const AddTeacher = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();


    const { classList } = useSelector(state => state.sclass)

    const subjectList = ['Toán', 'Tiếng việt', 'Tập viết', 'Tập vẽ', 'Âm nhạc', 'Tiếng anh']

    const submitHandler = (e) => {
        console.log(e)
        dispatch(addTeacher(e))
        navigate('/admin/teachers/')
    }

    useEffect(() => {
        dispatch(getClassList());
    }, [])
    return (
        <>
            <div className="flex justify-center items-center bg-blue-gray-300 top-0">
                <div className='w-full lg:w-1/2 p-5 bg-white'>
                    <Typography variant='h4'>Thêm giáo viên</Typography>
                    <form className="text-black flex flex-col gap-5 my-6 px-10" onSubmit={handleSubmit(submitHandler)}>
                        <label htmlFor='name'>Họ và tên</label>
                        <input className='border p-2 rounded-lg shadow-lg' {...register("name", { required: "Không được bỏ trống họ và tên" })} placeholder='Họ và tên' type="text" name="name" id='name' />
                        <label htmlFor='email'>Email</label>
                        <input className='border p-2 rounded-lg shadow-lg'  {...register("email", { required: "Không được bỏ trống email" })} type="email" name="email" placeholder='Email' id="email" />

                        <label htmlFor='phone'>Số điện thoại</label>
                        <input className='border p-2 rounded-lg shadow-lg'  {...register("phone", { required: "Không được bỏ trống số điện thoại" })} type="text" name="phone" placeholder='Số điện thoại' id="phone" />

                        <label htmlFor='class_id'>Chủ nhiệm lớp</label>
                        <select className='border p-2 rounded-lg shadow-lg'  {...register("class_id")} name="class_id" id='class_id'>
                            {classList ? classList.map(el =>
                                <option value={el._id} key={el.class_id}>{el.name}</option>
                            ) : ''}
                        </select>



                        <label htmlFor='gender'>Giới tính</label>
                        <select required className='border p-2 rounded-lg shadow-lg'  {...register("gender")} name="gender" id="gender">
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                        </select>
                        
                        <label htmlFor='subject'>Daỵ môn</label>
                        <select {...register("subject")} className='border p-2 rounded-lg shadow-lg' required name="subject" label="Môn" size="lg" id="subject">
                          {subjectList.map(el =>
                            <option value={el} key={el}>{el}</option>
                          )}
                        </select>


                        {errors.name && <p className='text-red-800 font-bold'>* {errors.name.message}</p>}
                        {errors.age && <p className='text-red-800 font-bold'>* {errors.age.message}</p>}
                        {errors.age && <p className='text-red-800 font-bold'>* {errors.parentname.message}</p>}
                        <Button className=" hover:bg-slate-400 text-white rounded-lg p-2" type="submit">Thêm học sinh</Button>
                        <Button className="bg-cyan-700 text-white rounded-lg p-2" onClick={() => navigate('/admin/teachers/')}>Hủy bỏ</Button>
                    </form>
                </div>

            </div>

        </>
    )
}

export default AddTeacher