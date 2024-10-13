import React, { useEffect } from 'react'
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  CardHeader,
  Card,
  CardBody,
  Typography
} from "@material-tailwind/react";
import { getDetailStudent } from '../../../redux/studentRelated/studentHandle';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';



const ViewStudent = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { studentDetails, loading } = useSelector(state => state.student)
  const params = useParams()
  const id = params.id

  const TABLE_HEAD = ["Điểm kiểm tra 1", "Điểm kiểm tra 2", "Điểm cuối kì", "Điểm trung bình"];
  const TABLE_ROWS = [];

  const TABLE_HEAD_BEHAVIOUR = ["Vi phạm", "Ngày"]
  const TABLE_ROWS_BEHAVIOUR = studentDetails.behaviour;
  console.log(studentDetails)
  useEffect(() => {
    dispatch(getDetailStudent(id))
    
  }, [id, dispatch])
  return (
    <>
    {console.log(loading)}
    {loading ? <p>Đang load</p> : <div>
      <Tabs value="info">
        <TabsHeader>
          <Tab key="info" value="info">
            <p>Thông tin</p>
          </Tab>
          <Tab key="mark" value="mark">
            <p>Điểm thi</p>
          </Tab>
          <Tab key="behaviour" value="behaviour">
            <p>Vi phạm</p>
          </Tab>
        </TabsHeader>
        <TabsBody>
          <TabPanel key="info" value="info" className='flex flex-col gap-y-10'>
            
            {/* 
            <p>Giới tính: {studentDetails.gender}</p>
            <p>Tên bố mẹ: {studentDetails.user_id.contact_info.name}</p>
            
            <p>Email: {studentDetails.user_id.contact_info.email}</p> */}
            <Card className="mt-5">
              <CardHeader className="h-10 grid place-items-center" color='gray'>Học sinh</CardHeader>
              <CardBody>
              <p>Họ và tên: {studentDetails?.name}</p>
              <p>Năm sinh: {studentDetails?.dob}</p>
              <p>Địa chỉ: {studentDetails?.address}</p>
              <p>Lớp: {studentDetails.class_id?.name}</p>
              </CardBody>
            </Card>
            
            <Card>
              <CardHeader className='h-10 grid place-items-center' color='gray'>Phụ huynh</CardHeader>
              <CardBody>
                <Typography>Tên phụ huynh: {studentDetails.user_id?.contact_info.name}</Typography>
                <Typography>Email: {studentDetails.user_id?.contact_info.email}</Typography>
                <Typography>Số điện thoại: {studentDetails.user_id?.contact_info.phone}</Typography>
              </CardBody>
            </Card>
          </TabPanel>
          
          <TabPanel key="mark" value="mark">
                <table class="w-full text-left table-auto min-w-max">
                  <thead>
                    <tr>
                      {TABLE_HEAD.map(head =>
                        <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                          <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                            {head}
                          </p>
                        </th>
                      )}


                    </tr>
                  </thead>
                  <tbody>
                    {TABLE_ROWS && TABLE_ROWS.map(row =>
                      <tr>
                        <td class="p-4 border-b border-blue-gray-50">
                          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {row.markfirsttime}
                          </p>
                        </td>
                        <td class="p-4 border-b border-blue-gray-50">
                          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                           {row.marksecondtime}
                          </p>
                        </td>
                        <td class="p-4 border-b border-blue-gray-50">
                          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {row.semestermark}
                          </p>
                        </td>
                        <td class="p-4 border-b border-blue-gray-50">
                          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {}
                          </p>
                        </td>
                      </tr>
                    )}
                    
                  </tbody>
                </table>
              

           
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
        </TabsBody>
      </Tabs>
    </div>}
    </>
  )
}

export default ViewStudent