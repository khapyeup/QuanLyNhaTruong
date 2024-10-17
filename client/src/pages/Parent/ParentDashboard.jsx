import React from 'react'
import ParentSidebar from './ParentSidebar'

import ParentHomepage from './ParentHomepage';
import { Route, Routes, Navigate } from 'react-router-dom';
import ParentStudent from './ParentStudent';
import ParentMessage from './ParentMessage';
import {Button} from '@material-tailwind/react'
import ParentFinance from './ParentFinance'
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/userRelated/userHandle';
import { showSideBar } from '../../redux/userRelated/userHandle';

function ParentDashboard() {
  const dispatch = useDispatch()

  const {isOpen} = useSelector(state => state.user);
  return (
    <>
      <div className='w-full h-screen flex flex-col md:flex-row'>
        <div className="">
          {/* Sidebar */}
          <ParentSidebar />
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
            <Route path="/" element={<ParentHomepage />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/parent/dashboard" element={<ParentHomepage />} />

           <Route path='/parent/student' element={<ParentStudent />}/>
           <Route path='/parent/finance' element={<ParentFinance />}/>
           <Route path='/parent/message' element={<ParentMessage />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default ParentDashboard