import { Button, Input } from '@material-tailwind/react'
import React from 'react'
import { IoMdClose } from "react-icons/io";
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { updateActivity, updateGroupActivity } from '../../../redux/activityRelated/activityHandle';
import { useEditActivityMutation } from '../../../redux/activityRelated/activityApiSlice';

const UpdateActivityModal = ({ onClose, activity, group }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const [updateActivity, {isLoading: isUpdating}] = useEditActivityMutation();
    const submit = (data) => {
        updateActivity({...data, id:group._id, activityId: activity._id}).unwrap().then(res => {toast.success(res.message); onClose()})
    }
    
    return (
        <div className='inset-0 fixed flex justify-center items-center bg-black/20' onClick={onClose}>
            <div className='opacity-100 bg-white w-1/4 px-2 py-3 rounded-lg' onClick={(e) => e.stopPropagation()}>
                <div className='flex justify-between items-center mb-5'>
                    Cập nhật nhóm hoạt động
                    <IoMdClose onClick={onClose} className='cursor-pointer text-2xl text-red-500 hover:text-black' />
                </div>

                <form onSubmit={handleSubmit(submit)}>
                    <Input {...register("name", { required: true, minLength: 5 })} name='name' type='text' label='Tên hoạt động' defaultValue={activity.name}/>
                    {errors.group_activity?.type === 'required' && <p>Chưa nhập tên hoạt động</p>}
                    {errors.group_activity?.type === 'minLength' && <p>Tối thiểu 5 kí tự</p>}

                    <Button disabled={isUpdating} type='submit' className='bg-red-700 mt-5'>Ok</Button>

                </form>
            </div>

        </div>
    )
}

export default UpdateActivityModal