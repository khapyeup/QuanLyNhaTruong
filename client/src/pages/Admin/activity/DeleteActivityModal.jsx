import { Button } from '@material-tailwind/react'
import React from 'react'
import { IoMdClose } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { deleteActivity } from '../../../redux/activityRelated/activityHandle';

const DeleteActivityModal = ({ onClose, activity, group }) => {

    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteActivity(group._id, activity._id))
        onClose();
    }
    return (
        <div className='inset-0 fixed flex justify-center items-center bg-black/20' onClick={onClose}>
            <div className='opacity-100 bg-white w-1/4 px-2 py-3 rounded-lg' onClick={(e) => e.stopPropagation()}>
                <div className='flex justify-between items-center mb-5'>
                    Bạn có chắc chắn muốn xóa không?
                    <IoMdClose onClick={onClose} className='cursor-pointer text-2xl text-red-500 hover:text-black' />
                </div>



                <Button onClick={handleDelete} className='bg-red-700 mt-5'>Ok</Button>
                <Button onClick={onClose} className='bg-gray-800 mt-5'>Không</Button>


            </div>

        </div>
    )
}

export default DeleteActivityModal