import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import Avatar from './Avatar';
import { FaArrowLeftLong } from "react-icons/fa6";
import { LuImagePlus } from "react-icons/lu";
import { uploadFile } from '../../helpers/uploadFile';


function MessagePanel() {
  const [userDetail, setUserDetail] = useState({
    _id: '',
    name: '',
    profile: '',
    online: false
  })
  const [messages, setMessages] = useState({
    text: '',
    imageUrl: '',
    fileUrl: '',
    seen: false,
  })
  
  const user = useSelector(state => state.user);
  
  const { socket } = useSelector(state => state.user);
  
  const { userId } = useParams();

  const uploadImage = async (e) => {
    const file = e.target.files[0];

    const uploadPhoto = await uploadFile(file);

    setMessages((prev) => {
      return { ...prev, imageUrl: uploadPhoto.url}
    })
  }

  useEffect(() => {
    if (socket) {
      socket.emit('load-receiverInfo', userId);

      socket.on('receiverInfo', (user) => {
        setUserDetail(user);
      })
    }
  }, [socket, userId, user])
  return (
    <div>
      <header className='sticky top-0 border-2 rounded bg-white '>
        <div className='flex gap-5 px-1 py-2 items-center rounded ml-2'>
          <Link to={'/parent/messages'}><FaArrowLeftLong size={35} className='transition hover:scale-110 cursor-pointer rounded-full hover:bg-gray-400 p-2' /></Link>
          <Avatar size={12} imgUrl={userDetail?.profile} userId={userDetail._id} />
          <div>
            <p className='font-bold'>{userDetail.name}</p>
            {userDetail?.online ? (<p className='text-gray-500'>Đang hoạt động</p>) : (<p className='text-gray-500'>Không hoạt động</p>)}
          </div>
        </div>
      </header>
      {/* Show all messages */}
      <div className='bg-red-300 overflow-y-scroll overflow-x-hidden h-[calc(100vh-64px-40px-16px-40px)]'>
        <p>Hi</p>
      </div>

      {/* Send Message Input */}

      <div className='h-10 flex items-center px-2'>
        <form>
          <label htmlFor='image'>
            <LuImagePlus className='size-9 rounded-full cursor-pointer p-1 transition hover:scale-110' />
          </label>
          <input onChange={uploadImage} className='hidden' id='image' type='file' />
        </form>

        {/* <input type='text'/> */}
      </div>
    </div>
  )
}

export default MessagePanel