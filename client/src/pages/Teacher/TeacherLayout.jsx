import React from 'react'
import { Link, Route, Router, Routes, Navigate } from 'react-router-dom'

import MenuTeacher from '../component/MenuTeacher'
import NavTeacher from '../component/NavTeacher'
import TeacherDashboard from './TeacherDashboard'
import TeacherStudent from './TeacherStudent'

function TeacherLayout() {
    return (
        <div className='h-screen flex'>
            {/* Trai */}
            <div className='w-[10%] md:w-[8%] lg:w-[14%] p-4'>
                <Link className='flex justify-center items-center mb-4' to={'/'}>
                    <img className='size-20' src='/logo.jpg' />
                    <p className='hidden lg:block'>Nhà trường ABC</p>
                </Link>
                <MenuTeacher />
            </div>

            {/* Phai */}
            <div className='w-[90%] md:w-[92%] lg:w-[86%] bg-[#F7F8FA] overflow-scroll'>
                <NavTeacher />
                <Routes>
                    <Route path='/' element={<TeacherDashboard />} />
                    <Route path='*' element={<Navigate to="/" />} />
                    <Route path='dashboard' element={<TeacherDashboard />} />
                    <Route path='students' element={<TeacherStudent />} />
                </Routes>
            </div>
        </div>
    )
}

export default TeacherLayout