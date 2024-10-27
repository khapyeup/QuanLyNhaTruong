import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTeacherList } from '../../redux/teacherRelated/teacherHandle'
import { getStudentByUser, getStudentList } from '../../redux/studentRelated/studentHandle'
import { getClassList } from '../../redux/sclassRelated/sclassHandle'
import { getNoticeList } from '../../redux/noticeRelated/noticeHandle'
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiStudent } from "react-icons/pi";

import { MdOutlineClass } from "react-icons/md";
import { RiParentLine } from "react-icons/ri";
import { Typography, Card, CardHeader, CardBody, List, ListItem, ListItemSuffix } from '@material-tailwind/react';
import Chart from "react-apexcharts";
import { getParentList } from '../../redux/parentRelated/parenHandle'

const ParentHomepage = () => {
  const dispatch = useDispatch();

  
  const { teacherList } = useSelector((state) => state.teacher)
  const {studentList} = useSelector(state => state.student);
  const {currentUser} = useSelector((state) => state.user)
  const {noticeList} = useSelector(state => state.notice)
  
  const numberOfTeacher = teacherList && teacherList.length
  const numberOfStudent = studentList && studentList.length

  console.log(currentUser)
  useEffect(() => {
    dispatch(getNoticeList())
    dispatch(getStudentByUser(currentUser._id))
  }, [])
  return (
    <>
      <div className='flex flex-col flex-1 p-14 gap-7 overflow-scroll'>
        <Typography variant="h5">
          Xin chào, {currentUser.username }
        </Typography>
        <div className=" p-2 gap-y-7 flex flex-col lg:flex-row justify-evenly items-center">
          <div className="text-white rounded-lg  bg-red-400 flex flex-col items-center justify-center gap-2 shadow-lg border p-2 min-w-56 min-h-40  hover:transition-transform hover:scale-110">
            <PiStudent className='size-20' />
            <p>Tổng số học sinh</p>
            <i className='fa fa-heart'></i>
            <p>{numberOfStudent.length == 0 ? 0 : numberOfStudent}</p>
          </div>
          <div className="text-white rounded-lg bg-amber-700 flex flex-col items-center justify-center gap-2 shadow-lg p-2 min-w-56 min-h-40 hover:transition-transform hover:scale-110">
            <FaChalkboardTeacher className='text-white size-20' />
            <p>Tổng số giáo viên</p>
            <p>{numberOfTeacher.length == 0 ? 0 : numberOfTeacher}</p>
          </div>

        </div>
        <div className='flex justify-evenly items-center'>
          <Card className="w-96">
            <Typography>Thông tin phụ huynh</Typography>
            <List>
              <ListItem ripple={false} className="py-1 pr-1 pl-4 text-blue">
                Tên đăng nhập
                <ListItemSuffix>
                  <Typography variant="text" color="blue-gray">
                    {currentUser.username}
                  </Typography>
                </ListItemSuffix>
              </ListItem>
              <ListItem ripple={false} className="py-1 pr-1 pl-4">
                Email
                <ListItemSuffix>
                  <Typography variant="text" color="blue-gray">
                    {currentUser.contact_info.father_email}
                  </Typography>
                </ListItemSuffix>
              </ListItem>
              <ListItem ripple={false} className="py-1 pr-1 pl-4">
                Số điện thoại
                <ListItemSuffix>
                  <Typography variant="text" color="blue-gray">
                    {currentUser.contact_info.father_phone}
                  </Typography>
                </ListItemSuffix>
              </ListItem>
            </List>
          </Card>
          
        </div>
      </div>
    </>
  )
}


export default ParentHomepage