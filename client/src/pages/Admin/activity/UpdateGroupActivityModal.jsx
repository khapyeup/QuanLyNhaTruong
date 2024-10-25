import { Button, Input } from '@material-tailwind/react'
import React from 'react'
import { IoMdClose } from "react-icons/io";
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { updateGroupActivity } from '../../../redux/activityRelated/activityHandle';

const UpdateGroupActivityModal = ({ onClose, activity }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    
    const submit = (data) => {
        console.log(activity.id, data)
        dispatch(updateGroupActivity(activity._id, data))
        onClose();
    }
    return (
        <div className='inset-0 fixed flex justify-center items-center bg-black/20' onClick={onClose}>
            <div className='opacity-100 bg-white w-1/4 px-2 py-3 rounded-lg' onClick={(e) => e.stopPropagation()}>
                <div className='flex justify-between items-center mb-5'>
                    Cập nhật nhóm hoạt động
                    <IoMdClose onClick={onClose} className='cursor-pointer text-2xl text-red-500 hover:text-black' />
                </div>

                <form onSubmit={handleSubmit(submit)}>
                    <Input {...register("group_activity", { required: true, minLength: 5 })} name='group_activity' type='text' label='Tên nhóm hoạt động' defaultValue={activity.group_activity}/>
                    {errors.group_activity?.type === 'required' && <p>Chưa nhập tên nhóm hoạt động</p>}
                    {errors.group_activity?.type === 'minLength' && <p>Tối thiểu 5 kí tự</p>}

                    <Button type='submit' className='bg-red-700 mt-5'>Ok</Button>

                </form>
            </div>

        </div>
    )
}

export default UpdateGroupActivityModal