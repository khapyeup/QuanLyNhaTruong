import React, { useEffect, useState } from 'react';
import ParentSidebar from './ParentSidebar';
import ParentHomepage from './ParentHomepage';
import { Route, Routes, Navigate, Link } from 'react-router-dom';
import ParentStudent from './ParentStudent';
import ParentMessage from './ParentMessage';
import ParentNotice from './ParentNotice';
import { Button } from '@material-tailwind/react';
import { useDispatch, useSelector } from 'react-redux';

import ParentNofication from './ParentNofication';
import StudentDetail from './StudentDetail';
import { io } from 'socket.io-client';
import { authLogout, setOnlineUsers, setSocket } from '../../redux/userRelated/userSlice';
import PaymentDetail from './PaymentDetail';
import ParentPayment from './ParentPayment';
import ParentComplaint from './ParentComplaint';



function ParentLayout() {
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
    dispatch(setSocket(socket));

    socket.on('onlineUsers', (data) => {
      dispatch(setOnlineUsers(data));
    })

    return () => {
      socket.disconnect();
    };
  }, [])

  return (
    <>
    
      <div className='h-screen flex'>
        {/* Trai */}
        <div className='md:w-[8%] lg:w-[14%] p-4'>
          <Link className='flex justify-center items-center mb-4' to={'/'}>
            <img className='size-20' src='/logo.jpg' />
            <p className='hidden lg:block'>Nhà trường ABC</p>
          </Link>
          {/* Sidebar */}
          <ParentSidebar />
        </div>



        {/* Phai */}
        <div className='w-full md:w-[92%] lg:w-[86%] bg-[#F7F8FA] overflow-y-scroll'>
          {/* Navbar */}

          <div className=" flex flex-row justify-end w-full px-6  py-1 items-center bg-white border-y-2">

            <div className='flex items-center gap-2 sm:gap-7'>
              
              <ParentNofication/>
              <Button onClick={() => dispatch(authLogout())}>Đăng xuất</Button>
              
            </div>

          </div>

          
            <Routes>
              <Route path="/" element={<ParentHomepage />} />
              <Route path="*" element={<Navigate to="/" />} />
              <Route path="/parent/dashboard" element={<ParentHomepage />} />
              <Route path='/parent/student' element={<ParentStudent />} />
              <Route path='/parent/student/:id' element={<StudentDetail />} />
              <Route path='/parent/notice' element={<ParentNotice />} />
              <Route path='/parent/payments' element={<ParentPayment />} />
              <Route path='/parent/payments/:studentId' element={<PaymentDetail/>}/>
              <Route path='/parent/messages/*' element={<ParentMessage />} />
              <Route path='/parent/complaints' element={<ParentComplaint userId={currentUser._id} />} />
            </Routes>
          

        </div>

      </div>
    </>
  )
}

export default ParentLayout