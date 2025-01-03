import React, { useEffect, useState } from 'react'
import { Dialog } from '@material-tailwind/react'
import { useDispatch, useSelector } from 'react-redux'
import { IoPersonAddOutline } from "react-icons/io5";
import SearchUser from '../component/SearchUser';
import { Routes, Route } from 'react-router-dom';
import MessagePanel from '../component/MessagePanel';
import Conversations from '../component/Conversations';



function ParentMessage() {
  const [openSearch, setOpenSearch] = useState(false);

  return <>
    <div className='flex'>
      {/* Ben trai */}
      <div className='w-[40%] md:w-[25%] border-2 rounded h-[calc(100vh-50px)]'>
        <div className='flex justify-between items-center p-5'>
          <h1 className='font-bold text-xl'>Đoạn chat</h1>
          <IoPersonAddOutline onClick={() => setOpenSearch(true)} className='transition hover:scale-110 size-10 cursor-pointer bg-gray-300 rounded-2xl p-2.5' />
        </div>

        {/* Danh sach doan chat */}
        <div>
          <Conversations />
        </div>

      </div>

      {/* Ben phai */}
      <div className='w-[60%] md:w-[75%]'>
        {/*Children is MessagePanel.jsx */}
        <Routes>
          <Route path=':userId' element={<MessagePanel />} />
        </Routes>

      </div>
    </div>

    <Dialog open={openSearch} handler={() => setOpenSearch(!openSearch)}>
      <SearchUser role={'teacher'} onClose={() => setOpenSearch(!openSearch)} />
    </Dialog>
  </>



}

export default ParentMessage