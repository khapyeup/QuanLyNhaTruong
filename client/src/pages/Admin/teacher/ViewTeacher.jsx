import { Card, CardHeader, CardBody } from '@material-tailwind/react'
import React, { useEffect } from 'react'
import { getDetailTeacher } from '../../../redux/teacherRelated/teacherHandle';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function ViewTeacher() {
    const dispatch = useDispatch()
    const params = useParams()
    const id = params.id
    const { teacherDetails } = useSelector(state => state.teacher)
    useEffect(() => {

        dispatch(getDetailTeacher(id))
    }, [id, dispatch])
    return (<>
        <Card className="mt-5">
            <CardHeader className="h-10 grid place-items-center" color='gray'>Thông tin giáo viên</CardHeader>
            <CardBody>
                <p>Họ và tên: {teacherDetails?.name}</p>
                <p>Giới tính: {teacherDetails?.gender}</p>
                <p>Địa chỉ: {teacherDetails?.email}</p>
                <p>Số điện thoại: {teacherDetails?.phone}</p>
                <p>Dạy môn: {teacherDetails?.subject}</p>
                <p>Chủ nhiệm lớp: {teacherDetails.class_id?.name}</p>
            </CardBody>
        </Card>
    </>
    )
}

export default ViewTeacher