import React from 'react'
import AdminSidebar from './AdminSidebar'
import { Routes, Route, Navigate } from "react-router-dom"
import AdminHomepage from './AdminHomepage'
import ShowStudent from './student/ShowStudent'
import ShowSubject from './subject/ShowSubject'
import ShowClasses from './classes/ShowClasses'
import ShowNotice from './notice/ShowNotice'
import AddStudent from "./student/AddStudent"
import StudentExamMarks from "./student/StudentExamMarks"
import StudentAttendance from "./student/StudentAttendance"
import ViewStudent from "./student/ViewStudent"
import { Button } from '@material-tailwind/react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../redux/userRelated/userHandle'
import ShowTeacher from './teacher/ShowTeacher'
import AddTeacher from './teacher/AddTeacher'
import ViewTeacher from './teacher/ViewTeacher'
import AddNotice from './notice/AddNotice'
import ViewNotice from './notice/ViewNotice'
import { showSideBar } from '../../redux/userRelated/userHandle'
import TimeTable from './timetable/TimeTable'
import ShowActivity from './activity/ShowActivity'
import AddActivity from './activity/AddActivity'
import AddClass from './classes/AddClass'

function AdminDashboard() {
  const dispatch = useDispatch()

  const {isOpen} = useSelector(state => state.user);


  return (
    <>
      <div className='w-full h-screen flex flex-col md:flex-row'>
        <div className="">
          {/* Sidebar */}
          <AdminSidebar />
        </div>

        {/* Navbar */}
        <div className="flex-1 overflow-y-auto">
          <div className="top-0 sticky flex flex-row justify-between w-full px-4 py-1 items-center shadow-md bg-white">
            <div>
            <button onClick={() => dispatch(showSideBar())} className={isOpen ? 'hidden' : 'visible'}>☰</button>
            </div>
            
            <Button onClick={() => dispatch(logoutUser())}>Đăng xuất</Button>
          </div>

          <Routes>
            <Route path="/" element={<AdminHomepage />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="admin/dashboard" element={<AdminHomepage />} />

            {/* Teacher route */}
            <Route path="/Admin/teachers/" element={<ShowTeacher />} />
            <Route path="admin/teachers/add" element={<AddTeacher />}/>
            <Route path="/admin/teachers/view/:id" element={<ViewTeacher />}/>
            {/* Student route */}
            <Route path="/admin/students/" element={<ShowStudent />} />
            {/* <Route path="/admin/students/add" element={<AddStudent />} /> */}
            <Route path="/admin/students/view/:id" element={<ViewStudent />}/>
            {/* <Route path="/admin/students/marks/:id" element={<StudentExamMarks/>} />
            <Route path="/Admin/students/attendance/:id" element={<StudentAttendance situation="Student" />} /> */}

            {/* Activity route */}
            <Route path="/admin/activities/" element={<ShowActivity />} />
            <Route path="admin/activities/add" element={<AddActivity />}/>


            {/* Classes route */}
            <Route path="/admin/classes/" element={<ShowClasses />} />
            <Route path="/admin/classes/add" element={<AddClass />} />
            
            {/* Notice router */}
            <Route path="/admin/notices/" element={<ShowNotice />} />
            <Route path="admin/notices/add" element={<AddNotice />}/>
            <Route path="/admin/notices/view/:id" element={<ViewNotice />}/>

            {/* Timetable route */}
            <Route path="admin/timetable/" element={<TimeTable/>}/>
          </Routes>
        </div>
      </div>


    </>
  )
}

export default AdminDashboard