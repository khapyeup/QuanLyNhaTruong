import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { format, intlFormat } from "date-fns";
import { Link, useParams } from 'react-router-dom'
import Avatar from './Avatar';
import { FaArrowLeftLong } from "react-icons/fa6";
import { LuImagePlus } from "react-icons/lu";
import { IoSendOutline } from "react-icons/io5";
import { uploadFile } from '../../helpers/uploadFile';
import { sendMessage } from '../../redux/chatRelated/chatHandle';


function MessagePanel() {
  const user = useSelector(state => state.user);
  const { socket } = useSelector(state => state.user);

  const { userId } = useParams();



  const [userDetail, setUserDetail] = useState({
    _id: '',
    name: '',
    profile: '',
    online: false
  })
  const [message, setMessage] = useState({
    sender: '',
    receiver: '',
    text: '',
    imageUrl: '',
    fileUrl: '',
    seen: false,
  })

  const [messages, setMessages] = useState([]);


  const uploadImage = async (e) => {
    const file = e.target.files[0];

    const uploadPhoto = await uploadFile(file);

    setMessage((prev) => {
      return { ...prev, imageUrl: uploadPhoto.url }
    })
  }

  const inputMessage = (e) => {
    setMessage((prev) => ({ ...prev, text: e.target.value, sender: user.currentUser._id, receiver: userId }))
  }

  const handleSend = (e) => {
    e.preventDefault();

    if (socket)
      socket.emit('send-message', message);

    setMessage((prev) => ({
      ...prev,
      text: '',
      fileUrl: '',
      imageUrl: '',
      seen: false
    }))

  }
  console.log(message)
  useEffect(() => {
    if (socket) {
      socket.emit('load-receiverInfo', { sender: user.currentUser._id, receiver: userId });

      socket.on('receiverInfo', (user) => {
        setUserDetail(user);
      })

      socket.on('messages', (messages) => {
        setMessages(messages);
        console.log(messages);
      })
    }
  }, [socket, userId, user])
  return (
    <div>
      <header className='sticky top-0 border-2 rounded bg-white '>
        <div className='flex gap-5 px-1 py-2 items-center rounded ml-2'>
          <Link to={'/parent/messages/'}><FaArrowLeftLong size={35} className='transition hover:scale-110 cursor-pointer rounded-full hover:bg-gray-400 p-2' /></Link>
          <Avatar size={12} imgUrl={userDetail?.profile} userId={userDetail._id} />
          <div>
            <p className='font-bold'>{userDetail.name}</p>
            {userDetail?.online ? (<p className='text-gray-500'>Đang hoạt động</p>) : (<p className='text-gray-500'>Không hoạt động</p>)}
          </div>
        </div>
      </header>

      {/* Show all message */}
      <div className='overflow-y-scroll flex flex-col gap-1 overflow-x-hidden h-[calc(100vh-64px-40px-16px-40px)] px-5 py-4'>
        {messages?.map((message) => (
          <div className={`px-3 py-2 rounded-2xl w-fit ${message.sender === user.currentUser._id ? `bg-blue-500 text-white ml-auto text-right` : `bg-gray-200`}`} key={message._id}>
            {message.imageUrl && <img className='size-96 ' src={message.imageUrl} />}

            {message.text && (
              <div>
                <p>{message.text}</p>
                <p className='text-[12px]'>{format(message.createdAt, 'h:m - dd/MM/yy ')}</p>
              </div>

            )}

          </div>
        ))}
      </div>

      {/* Send Message Input */}

      <div className='h-10 px-2 mt-1'>
        <form onSubmit={handleSend} className='flex item-center relative'>
          <label htmlFor='image'>
            <LuImagePlus className='size-9 rounded-full cursor-pointer p-1 transition hover:scale-110' />
          </label>
          <input onChange={uploadImage} className='hidden' id='image' type='file' />
          <input value={message.text} onChange={inputMessage} className='w-full bg-gray-300 rounded-full px-2 outline-none' />

          {(message.text || message.imageUrl) && (
            <button type='submit' className='absolute right-2 top-1 hover:bg-gray-400 rounded-full p-1'>
              <IoSendOutline className='size-6' />
            </button>
          )
          }
        </form>
      </div>
    </div>
  )
}

export default MessagePanel