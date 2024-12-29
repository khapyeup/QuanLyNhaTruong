import { Button, Input } from '@material-tailwind/react'
import React from 'react'
import { IoMdClose } from "react-icons/io";
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { addActivity } from '../../../redux/activityRelated/activityHandle';
import { useAddActivityMutation } from '../../../redux/activityRelated/activityApiSlice';
import {toast} from 'react-toastify'

const AddActivityModal = ({ onClose, activity }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const [addActivity, {isLoading: isAdding}] = useAddActivityMutation();
    const submit = (data) => {
        addActivity({...data, id: activity._id}).unwrap().then(res => {toast.success(res.message); onClose()})

        
        
    }
    return (
        <div className='inset-0 fixed flex justify-center items-center bg-black/20'>
            <div className='bg-white opacity-100 w-1/4 px-2 py-3 rounded-lg' onClick={(e) => e.stopPropagation()}>
                <div className='flex justify-between items-center mb-5'>
                    Thêm hoạt động mới
                    <IoMdClose onClick={onClose} className='cursor-pointer text-2xl text-red-500 hover:text-black' />
                </div>

                <form onSubmit={handleSubmit(submit)}>
                    <Input {...register("name", { required: true, minLength: 5 })} name='name' type='text' label='Tên hoạt động' />
                    {errors.name?.type === 'required' && <p>Chưa nhập tên hoạt động</p>}
                    {errors.name?.type === 'minLength' && <p>Tối thiểu 5 kí tự</p>}

                    <Button disabled={isAdding} type='submit' className='bg-red-700 mt-5'>Ok</Button>

                </form>
            </div>

        </div>
    )
}

export default AddActivityModal