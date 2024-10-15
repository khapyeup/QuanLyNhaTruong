import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addNotice, getNoticeList } from '../../../redux/noticeRelated/noticeHandle';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Input, Textarea } from '@material-tailwind/react';
import { useForm } from 'react-hook-form'

const AddNotice = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();

    const {noticeList} = useSelector(state => state.notice)
    
    const submitHandler = (e) => {
        dispatch(addNotice(e))
        navigate('/admin/notices/')
    }

    
    return (
        <>
            <div className="flex justify-center items-center bg-blue-gray-300 top-0 h-screen">
                <div className='w-full lg:w-1/2 p-5 bg-white'>
                    <Typography variant='h4'>Thêm thông báo</Typography>
                    <form className="text-black flex flex-col gap-5 my-6 px-10" onSubmit={handleSubmit(submitHandler)}>
                        
                        <Input label="Tiêu đề" {...register("title", { required: "Không được bỏ trống tiêu đề" })} type="text" name="title" id='title' />
                        <Textarea label="Nội dung" {...register("content", { required: "Không được bỏ trống nội dung", minLength: {value: 10, message: "Tối thiểu 10 kí tự"} })} name="content"></Textarea>

                        {errors.title && <p className='text-red-800 font-bold'>* {errors.title.message}</p>}
                        {errors.content && <p className='text-red-800 font-bold'>* {errors.content.message}</p>}
                        
                        <Button className=" hover:bg-slate-400 text-white rounded-lg p-2" type="submit">Thêm thông báo</Button>
                        <Button className="bg-cyan-700 text-white rounded-lg p-2" onClick={() => navigate('/admin/notices/')}>Hủy bỏ</Button>
                    </form>
                </div>

            </div>

        </>
    )
}

export default AddNotice