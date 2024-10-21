import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addClass } from '../../../redux/sclassRelated/sclassHandle';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Input, Textarea } from '@material-tailwind/react';
import { useForm } from 'react-hook-form'

const AddClass = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm();

    
    
    const submitHandler = (e) => {
        dispatch(addClass(e))
        navigate('/admin/classes/')
    }

    
    return (
        <>
            <div className="flex justify-center items-center bg-blue-gray-300 top-0 h-screen">
                <div className='w-full lg:w-1/2 p-5 bg-white'>
                    <Typography variant='h4'>Thêm lớp</Typography>
                    <form className="text-black flex flex-col gap-5 my-6 px-10" onSubmit={handleSubmit(submitHandler)}>
                        
                        <Input label="Tên lớp" {...register("name", { required: "Không được bỏ trống tên" })} type="text" name="name" id='name' />
                        

                        {errors.name && <p className='text-red-800 font-bold'>* {errors.name.message}</p>}
                        
                        
                        <Button className=" hover:bg-slate-400 text-white rounded-lg p-2" type="submit">Thêm lớpg</Button>
                        <Button className="bg-cyan-700 text-white rounded-lg p-2" onClick={() => navigate('/admin/classes/')}>Hủy bỏ</Button>
                    </form>
                </div>

            </div>

        </>
    )
}

export default AddClass