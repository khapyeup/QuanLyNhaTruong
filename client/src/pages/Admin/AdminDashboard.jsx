import React from 'react'
import AdminSidebar from './AdminSidebar'
import { Routes, Route, Navigate } from "react-router-dom"
import AdminHomepage from './AdminHomepage'
import { ShowTeacher } from './teacher/ShowTeacher'
import ShowStudent from './student/ShowStudent'
import ShowSubject from './subject/ShowSubject'
import ShowClasses from './classes/ShowClasses'
import ShowNotice from './notice/ShowNotice'
import AddStudent from "./student/AddStudent"
import StudentExamMarks from "./student/StudentExamMarks"
import StudentAttendance from "./student/StudentAttendance"
import ViewStudent from "./student/ViewStudent"
import EditStudent from "./student/EditStudent"
import DeleteStudent from "./student/DeleteStudent"
import { Button } from '@material-tailwind/react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../redux/userRelated/userHandle'


function AdminDashboard() {
  const dispatch = useDispatch()
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
            <button className="hidden">☰</button>
            <p>Hi</p>
            </div>
            
            <Button onClick={() => dispatch(logoutUser())}>Đăng xuất</Button>
          </div>

          <Routes>
            <Route path="/" element={<AdminHomepage />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="admin/dashboard" element={<AdminHomepage />} />

            {/* Teacher route */}
            <Route path="/Admin/teachers/" element={<ShowTeacher />} />

            {/* Student route */}
            <Route path="/admin/students/" element={<ShowStudent />} />
            <Route path="/admin/students/add" element={<AddStudent />} />
            <Route path="/admin/students/view/:id" element={<ViewStudent />}/>
            <Route path="/admin/students/edit/:id" element={<EditStudent />}/>
            <Route path="/admin/students/delete/:id" element={<DeleteStudent />}/>
            <Route path="/admin/students/marks/:id" element={<StudentExamMarks/>} />
            <Route path="/Admin/students/attendance/:id" element={<StudentAttendance situation="Student" />} />

            {/* Subjects route */}
            <Route path="/admin/subjects/" element={<ShowSubject />} />

            {/* Classes route */}
            <Route path="/admin/classes/" element={<ShowClasses />} />
            {/* Notice router */}
            <Route path="/admin/notices/" element={<ShowNotice />} />
          </Routes>
        </div>
      </div>


    </>
  )
}

export default AdminDashboard