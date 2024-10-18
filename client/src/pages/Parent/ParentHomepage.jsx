import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTeacherList } from '../../redux/teacherRelated/teacherHandle'
import { getStudentList } from '../../redux/studentRelated/studentHandle'
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
  const { classList } = useSelector((state) => state.sclass)
  const { teacherList } = useSelector((state) => state.teacher)
  const { studentList } = useSelector((state) => state.student)

  const numberOfClass = classList && classList.length
  const numberOfTeacher = teacherList && teacherList.length
  const numberOfStudent = studentList && studentList.length

  return (
    <>
      <div className='flex flex-col flex-1 p-14 gap-7 overflow-scroll'>
        <Typography variant="h5">
          Chào mừng phụ huynh đến với hệ thống quản lý trường mầm non
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
          <div className="text-white rounded-lg bg-lime-800 flex flex-col items-center justify-center gap-2 shadow-lg p-2 min-w-56 min-h-40  hover:transition-transform hover:scale-110">
            <MdOutlineClass className='text-white size-20' />
            <p>Tổng số môn học</p>
            <p>{numberOfClass.length == 0 ? 0 : numberOfClass}</p>
          </div>
        </div>
        <div className='flex justify-evenly items-center'>
          <Card className="w-96">
            <Typography>Thong tin phu huynh</Typography>
            <List>
              <ListItem ripple={false} className="py-1 pr-1 pl-4 text-blue">
                Username
                <ListItemSuffix>
                  <Typography variant="text" color="blue-gray">
                    parent123
                  </Typography>
                </ListItemSuffix>
              </ListItem>
              <ListItem ripple={false} className="py-1 pr-1 pl-4">
                Email
                <ListItemSuffix>
                  <Typography variant="text" color="blue-gray">
                    parent@example.com
                  </Typography>
                </ListItemSuffix>
              </ListItem>
              <ListItem ripple={false} className="py-1 pr-1 pl-4">
                Số điện thoại
                <ListItemSuffix>
                  <Typography variant="text" color="blue-gray">
                    0123456789
                  </Typography>
                </ListItemSuffix>
              </ListItem>
              <ListItem ripple={false} className="py-1 pr-1 pl-4">
                Địa chỉ
                <ListItemSuffix>
                  <Typography variant="text" color="blue-gray">
                    123 Đường ABC, Quận 1, TP. HCM
                  </Typography>
                </ListItemSuffix>
              </ListItem>
            </List>
          </Card>
          <Card className="w-96">

            <List>
              <ListItem ripple={false} className="py-1 pr-1 pl-4">
                Item One
                <ListItemSuffix>
                  <Typography variant="text" color="blue-gray">
                    asdasd
                  </Typography>
                </ListItemSuffix>
              </ListItem>
              <ListItem ripple={false} className="py-1 pr-1 pl-4">
                Item Two
              </ListItem>
              <ListItem ripple={false} className="py-1 pr-1 pl-4">
                Item Three
              </ListItem>
            </List>
          </Card>
        </div>
      </div>
    </>
  )
}


export default ParentHomepage