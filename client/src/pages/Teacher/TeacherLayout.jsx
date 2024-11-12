import React, { useEffect } from 'react'
import { Link, Route, Routes, Navigate } from 'react-router-dom'
import { io } from 'socket.io-client';

import MenuTeacher from '../component/MenuTeacher'
import NavTeacher from '../component/NavTeacher'
import TeacherDashboard from './TeacherDashboard'
import TeacherStudent from './TeacherStudent'
import { useDispatch, useSelector } from 'react-redux'
import { OnlineUsers, SocketConnection } from '../../redux/userRelated/userHandle';
import TeacherMessage from './TeacherMessage';
import TeacherAttendance from './TeacherAttendance';
import DetailStudent from './DetailStudent';
import TeacherTimetable from './TeacherTimetable';



function TeacherLayout() {
    const dispatch = useDispatch();
    const { currentUser } = useSelector(state => state.user);

    useEffect(() => {
        const socket = io('http://localhost:3000', {
            auth: {
                userId: currentUser._id
            }
        });

        dispatch(SocketConnection(socket));
        socket.on('onlineUsers', (data) => {
            dispatch(OnlineUsers(data))
        })

        return () => {
            socket.disconnect();
          };
    }, [])
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
            <div className='w-[90%] md:w-[92%] lg:w-[86%] bg-[#F7F8FA] overflow-y-scroll'>
                <NavTeacher />
                <Routes>
                    <Route path='/' element={<TeacherDashboard />} />
                    <Route path='*' element={<Navigate to="/" />} />
                    <Route path='dashboard' element={<TeacherDashboard />} />
                    <Route path='students' element={<TeacherStudent />} />
                    <Route path='students/:id' element={<DetailStudent/> }/>
                    <Route path='messages/*' element={<TeacherMessage />} />
                    <Route path='attendance' element={<TeacherAttendance />} />
                    <Route path='timetable' element={<TeacherTimetable/>} />
                </Routes>
            </div>
        </div>
    )
}

export default TeacherLayout