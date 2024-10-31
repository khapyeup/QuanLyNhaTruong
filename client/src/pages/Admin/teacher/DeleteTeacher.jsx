import React from 'react'
import { Card, CardBody, CardFooter, Typography, Button } from '@material-tailwind/react'
import { useDispatch } from 'react-redux'
import { deleteTeacher } from '../../../redux/teacherRelated/teacherHandle';

const DeleteTeacher = ({teacher, open}) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteTeacher(teacher._id));
        open();
    }
  return (
    <Card className='p-4'>
        <Typography>Bạn có muốn xoá giáo viên này không?</Typography>
        <CardFooter>
            <Button onClick={handleDelete} className="bg-red-700 text-white" fullWidth>Có</Button>
        </CardFooter>
    </Card>
  )
}

export default DeleteTeacher