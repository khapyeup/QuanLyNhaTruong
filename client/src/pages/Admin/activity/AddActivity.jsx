import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addActivity } from '../../../redux/activityRelated/activityHandle';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Input, Textarea } from '@material-tailwind/react';
import { useForm } from 'react-hook-form'

const AddActivity = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm();

    
    
    const submitHandler = (e) => {
        dispatch(addActivity(e))
        navigate('/admin/activities/')
    }

    
    return (
        <>
            <div className="flex justify-center items-center bg-blue-gray-300 top-0 h-screen">
                <div className='w-full lg:w-1/2 p-5 bg-white'>
                    <Typography variant='h4'>Thêm hoạt động</Typography>
                    <form className="text-black flex flex-col gap-5 my-6 px-10" onSubmit={handleSubmit(submitHandler)}>
                        
                        <Input label="Tên hoạt động" {...register("activity_name", { required: "Không được bỏ trống tên" })} type="text" name="activity_name" id='activity_name' />
                        

                        {errors.activity_name && <p className='text-red-800 font-bold'>* {errors.activity_name.message}</p>}
                        
                        
                        <Button className=" hover:bg-slate-400 text-white rounded-lg p-2" type="submit">Thêm hoạt động</Button>
                        <Button className="bg-cyan-700 text-white rounded-lg p-2" onClick={() => navigate('/admin/activities/')}>Hủy bỏ</Button>
                    </form>
                </div>

            </div>

        </>
    )
}

export default AddActivity