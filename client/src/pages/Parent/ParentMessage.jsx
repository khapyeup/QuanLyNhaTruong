import React, { useEffect, useState } from 'react'
import {Dialog} from '@material-tailwind/react'
import { useDispatch, useSelector } from 'react-redux'
import { IoPersonAddOutline } from "react-icons/io5";
import SearchUserParent from '../component/searchUserParent';
import { io } from "socket.io-client";

function ParentMessage() {
  const [openSearch, setOpenSearch] = useState(false);

  useEffect(() => {
    const socket = io('http://localhost:3000');
    
  },[])

  return <>
    <div className='flex h-screen'>
      {/* Ben trai */}
      <div className='w-[40%] md:w-[25%] border rounded'>
        <div className='flex justify-between items-center p-5'>
          <h1 className='font-bold text-xl'>Đoạn chat</h1>
          <IoPersonAddOutline onClick={() => setOpenSearch(true)} className='size-10 cursor-pointer bg-gray-300 rounded-2xl p-2.5'/>
        </div>
        {/* Danh sach doan chat */}
        <div>

        </div>
        
      </div>
      
      {/* Ben phai */}
      <div className='w-[60%] md:w-[75%]'>
        <p>r</p>
      </div>
    </div>

    <Dialog open={openSearch} handler={() => setOpenSearch(!openSearch)}>
      <SearchUserParent />
    </Dialog>
  </>



}

export default ParentMessage