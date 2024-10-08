import React from 'react'
import AdminSidebar from './AdminSidebar'
import { Routes, Route, Navigate } from "react-router-dom"
import AdminHomepage from './AdminHomepage'
import { ShowTeacher } from './teacher/ShowTeacher'
import ShowStudent from './student/ShowStudent'
import ShowSubject from './subject/ShowSubject'
import ShowClasses from './classes/ShowClasses'
import ShowNotice from './notice/ShowNotice'

function AdminDashboard() {
  return (
    <>
      <div className='w-full h-screen flex flex-col md:flex-row'>
        <div className="w-1/6 h-screen bg-slate-300 sticky top-0 hidden md:block">
          {/* Sidebar */}
          <AdminSidebar />
        </div>

        {/* Navbar */}
        <div className="flex-1 overflow-y-auto">
          <div className="top-0 bg-slate-300 sticky flex flex-row justify-between w-full p-2 items-center">
            <div>
            <button className="hidden">☰</button>
            <p>Hi</p>
            </div>
            
            <button className="bg-blue-300 p-2 rounded-lg hover:bg-blue-500">Đăng xuất</button>
          </div>

          <Routes>
            <Route path="/" element={<AdminHomepage />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="admin/dashboard" element={<AdminHomepage />} />

            {/* Teacher route */}
            <Route path="/Admin/teachers/" element={<ShowTeacher />} />

            {/* Student route */}
            <Route path="/admin/students/" element={<ShowStudent />} />

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