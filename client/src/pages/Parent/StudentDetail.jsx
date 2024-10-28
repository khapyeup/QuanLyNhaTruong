import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getDetailStudent } from '../../redux/studentRelated/studentHandle';
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel, Card, CardHeader, CardBody, Typography } from '@material-tailwind/react';

function StudentDetail() {
  const dispatch = useDispatch();
  
  const {studentId} = useParams();

  const {studentDetails} = useSelector(state => state.student);

  const TABLE_HEAD_BEHAVIOUR = ["Vi phạm", "Ngày"]
  const TABLE_ROWS_BEHAVIOUR = studentDetails.behaviour;

  const TABLE_HEAD_ATTENDANCE = ['Tình trạng', 'Ngày']
  const TABLE_ROWS_ATTENDANCE = studentDetails.attendance;

  useEffect(() => {
    dispatch(getDetailStudent(studentId))
  }, [])
  return (
    <div>
      <Tabs value="info">
          <TabsHeader>
            <Tab key="info" value="info">
              <p>Thông tin</p>
            </Tab>

            <Tab key="behaviour" value="behaviour">
              <p>Thành tích</p>
            </Tab>
            <Tab key="attendance" value="attendance">
              <p>Điểm danh</p>
            </Tab>
          </TabsHeader>
          <TabsBody>
            <TabPanel key="info" value="info" className='flex flex-col gap-y-10 '>

              {/* Thong tin tre */}
              <Card className="mt-5">
                <CardHeader className="h-10 grid place-items-center" color='gray'>Thông tin học sinh</CardHeader>
                <CardBody>

                  <div className='flex flex-col gap-5 md:gap-10 md:flex-row items-center'>

                    {/* Ben trai */}
                    <div>
                      <img className='size-48 rounded-full border-2 border-black' src={'/' + studentDetails.avatar} />
                    </div>
                    
                    
                    {/* Ben phai */}
                   
                    <div>
                      <div className='flex gap-3'>
                        <Typography className='font-bold'>Họ và tên: </Typography>
                        <Typography>{studentDetails?.name}</Typography>
                      </div>
                      <div className='flex gap-3'>
                        <Typography className='font-bold'>Mã định danh: </Typography>
                        <Typography>{studentDetails?.student_id}</Typography>
                      </div>
                      <div className='flex gap-3'>
                        <Typography className='font-bold'>Năm sinh:</Typography>
                        <Typography> {studentDetails?.dob}</Typography>
                      </div>
                      <div className='flex gap-3'>
                        <Typography className='font-bold'>Giới tính: </Typography>
                        <Typography> {studentDetails?.gender}</Typography>
                      </div>
                      <div className='flex gap-3'>
                        <Typography className='font-bold'>Địa chỉ: </Typography>
                        <Typography>{studentDetails?.address}</Typography>
                      </div>

                      <div className='flex gap-3'>
                        <Typography className='font-bold'>Lớp:</Typography>
                        <Typography> {studentDetails.class_id?.name}</Typography>
                      </div>
                    </div>
                    
                 
                  </div>

                </CardBody>
              </Card>


              {/* Thong tin phu huynh */}
              <Card>
                <CardHeader className='h-10 grid place-items-center' color='gray'>Thông tin cha</CardHeader>
                <CardBody>
                  <div className='flex gap-3'>
                    <Typography className='font-bold'>Tên cha: </Typography>
                    <Typography>{studentDetails.user_id?.contact_info.father_name}</Typography>
                  </div>
                  <div className='flex gap-3'>
                    <Typography className='font-bold'>Email:</Typography>
                    <Typography> {studentDetails.user_id?.contact_info.father_email}</Typography>
                  </div>
                  <div className='flex gap-3'>
                    <Typography className='font-bold'>Số điện thoại: </Typography>
                    <Typography>{studentDetails.user_id?.contact_info.father_phone}</Typography>
                  </div>
                  <div className='flex gap-3'>
                    <Typography className='font-bold'>CCCD: </Typography>
                    <Typography>{studentDetails.user_id?.contact_info.father_cccd}</Typography>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardHeader className='h-10 grid place-items-center' color='gray'>Thông tin mẹ</CardHeader>
                <CardBody>
                  <div className='flex gap-3'>
                    <Typography className='font-bold'>Tên cha: </Typography>
                    <Typography>{studentDetails.user_id?.contact_info.mother_name}</Typography>
                  </div>
                  <div className='flex gap-3'>
                    <Typography className='font-bold'>Email:</Typography>
                    <Typography> {studentDetails.user_id?.contact_info.mother_email}</Typography>
                  </div>
                  <div className='flex gap-3'>
                    <Typography className='font-bold'>Số điện thoại: </Typography>
                    <Typography>{studentDetails.user_id?.contact_info.mother_phone}</Typography>
                  </div>
                  <div className='flex gap-3'>
                    <Typography className='font-bold'>CCCD: </Typography>
                    <Typography>{studentDetails.user_id?.contact_info.mother_cccd}</Typography>
                  </div>
                </CardBody>
              </Card>
            </TabPanel>



            <TabPanel key="behaviour" value="behaviour">
              <table class="w-full text-left table-auto min-w-max">
                <thead>
                  <tr>
                    {TABLE_HEAD_BEHAVIOUR.map(head =>
                      <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                        <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                          {head}
                        </p>
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {TABLE_ROWS_BEHAVIOUR && TABLE_ROWS_BEHAVIOUR.map(row =>
                    <tr>
                      <td class="p-4 border-b border-blue-gray-50">
                        <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                          {row.title}
                        </p>
                      </td>
                      <td class="p-4 border-b border-blue-gray-50">
                        <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                          {row.date}
                        </p>
                      </td>

                    </tr>
                  )}

                </tbody>
              </table>
            </TabPanel>


            {/* Điểm danh */}
            <TabPanel key="attendance" value='attendance'>
              <Card>
                <CardBody>
                  <Typography>
                    Tổng số ngày vắng:
                    {studentDetails.attendance?.filter(item => item.status === 'Vắng').length}
                  </Typography>
                  <Typography>
                    Tổng số ngày đúng giờ:
                    {studentDetails.attendance?.filter(item => item.status === 'Hiện diện').length}
                  </Typography>
                </CardBody>
              </Card>
              <table class="w-full text-left table-auto min-w-max">
                <thead>
                  <tr>
                    {TABLE_HEAD_ATTENDANCE.map(head =>
                      <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                        <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                          {head}
                        </p>
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {TABLE_ROWS_ATTENDANCE && TABLE_ROWS_ATTENDANCE.map(row =>
                    <tr>
                      <td class="p-4 border-b border-blue-gray-50">
                        <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                          {row.status}
                        </p>
                      </td>
                      <td class="p-4 border-b border-blue-gray-50">
                        <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                          {row.date?.slice(0, 10)}
                        </p>
                      </td>

                    </tr>
                  )}

                </tbody>
              </table>
            </TabPanel>
          </TabsBody>
        </Tabs>
    </div>
  )
}

export default StudentDetail