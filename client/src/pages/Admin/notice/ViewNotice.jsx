import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getDetailNotice } from '../../../redux/noticeRelated/noticeHandle';
import { useSelector, useDispatch } from 'react-redux';

function ViewNotice() {
  const params = useParams();
  const id = params.id;

  const dispatch = useDispatch()

  const { noticeDetails } = useSelector(state => state.notice)

  useEffect(() => {
    dispatch(getDetailNotice(id));
  }, [id])
  return (
    <Card className='top-10'>
      <CardHeader className='h-10 grid place-items-center' color='gray'>Thông báo</CardHeader>
      <CardBody>
        <Typography className='font-bold'>
          Tiêu đề
        </Typography>
        <Typography>
          {noticeDetails.title}
        </Typography>

        <Typography className='font-bold'>
          Ngày tạo
        </Typography>
        <Typography>
          {noticeDetails.date?.slice(0, 10)}
        </Typography>

        <Typography className='font-bold'>
          Nội dung
        </Typography>
        <Typography>
          {noticeDetails.content}
        </Typography>
      </CardBody>
    </Card>
  )
}

export default ViewNotice