import React, { useEffect, useState } from 'react';
import ParentSidebar from './ParentSidebar';
import ParentHomepage from './ParentHomepage';
import { Route, Routes, Navigate } from 'react-router-dom';
import ParentStudent from './ParentStudent';
import ParentMessage from './ParentMessage';
import ParentNotice from './ParentNotice';
import { Button } from '@material-tailwind/react';
import ParentFinance from './ParentFinance';
import { useDispatch, useSelector } from 'react-redux';

import { HiOutlineBell } from "react-icons/hi2";
import ParentNofication from './ParentNofication';
import StudentDetail from './StudentDetail';
import { io } from 'socket.io-client';
import MessagePanel from '../component/MessagePanel';


function ParentDashboard() {
  const dispatch = useDispatch()

  const { isOpen, currentUser, onlineUsers } = useSelector(state => state.user);
  
  const [isNoficationMenuOpen, setIsNoficationMenuOpen] = useState(false);

  const handleNoficationMenu = () => {
    setIsNoficationMenuOpen(!isNoficationMenuOpen);
   
  }

  useEffect(() => {
    const socket = io('http://localhost:3000', {
      auth: {
        userId: currentUser._id
      }
    });
    dispatch(SocketConnection(socket));
    
    socket.on('onlineUsers', (data) => {
      dispatch(OnlineUsers(data));
    })

     return () => {
      socket.disconnect();
    };
  }, [])
 
  return (
    <>
      <div className='w-full h-screen flex flex-col md:flex-row'>
        <div className="">
          {/* Sidebar */}
          <ParentSidebar />
        </div>

        {/* Navbar */}
        <div className="flex-1 overflow-y-scroll h-screen">
          <div className=" flex flex-row justify-between w-full px-4 py-1 items-center shadow-md bg-white">
            <div>
              <button onClick={() => dispatch(showSideBar())} className={isOpen ? 'hidden' : 'visible'}>☰</button>
            </div>

            <div className='flex items-center gap-2 sm:gap-7'>
              <HiOutlineBell className='size-6  cursor-pointer' onClick={handleNoficationMenu} />
              <Button onClick={() => dispatch(logoutUser())}>Đăng xuất</Button>
              {isNoficationMenuOpen ?
                <div className='p-2 max-w-72 w-72 overflow-y-auto absolute top-12 right-36 border-black border-2 rounded-lg bg-white'>
                  <ParentNofication />
                </div>
                : ''}
            </div>

          </div>

          <Routes>
            <Route path="/" element={<ParentHomepage />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/parent/dashboard" element={<ParentHomepage />} />
            <Route path='/parent/student' element={<ParentStudent />} />
            <Route path='/parent/student/:studentId' element={<StudentDetail />} />
            <Route path='/parent/notice' element={<ParentNotice />} />
            <Route path='/parent/finance' element={<ParentFinance />} />
            <Route path='/parent/messages/*' element={<ParentMessage />} />
            
          </Routes>
        </div>
      </div>
    </>
  )
}

export default ParentDashboard