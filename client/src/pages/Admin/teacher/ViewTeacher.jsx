import { Card, CardHeader, CardBody, Typography } from '@material-tailwind/react'
import React, { useEffect } from 'react'
import { getDetailTeacher } from '../../../redux/teacherRelated/teacherHandle';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function ViewTeacher() {
    const dispatch = useDispatch()
    
    const params = useParams()
    const id = params.id
    
    const { teacherDetails } = useSelector(state => state.teacher)
    console.log(teacherDetails)
    useEffect(() => {
        dispatch(getDetailTeacher(id))
    }, [id, dispatch])
    return (<>
        <Card className="mt-10">
            <CardHeader className="h-10 grid place-items-center" color='gray'>Thông tin giáo viên</CardHeader>
            <CardBody>
                <div className=''>
                    <img className='rounded-full border-2 border-black size-48' src={`/${teacherDetails.profile}`}/>
                    <Card className='mt-5'>
                        <CardBody>
                        <Typography>Tài khoản: {teacherDetails.username}</Typography>
                            <Typography>Họ và tên: {teacherDetails.teacherInfo?.name}</Typography>
                            <Typography>Giới tính: {teacherDetails.teacherInfo?.gender}</Typography>
                            <Typography>Tuổi: {teacherDetails.teacherInfo?.age}</Typography>
                            <Typography>Email: {teacherDetails.teacherInfo?.email}</Typography>
                            <Typography>Số điện thoại: {teacherDetails.teacherInfo?.phone}</Typography>
                            <Typography>Lớp: {teacherDetails?.teacherInfo?.class?.name}</Typography>
                            <Typography>Hoạt động: {teacherDetails.teacherInfo?.activityAssign.group_activity}</Typography>
                        </CardBody>
                    </Card>
                </div>
            </CardBody>
        </Card>
    </>
    )
}

export default ViewTeacher