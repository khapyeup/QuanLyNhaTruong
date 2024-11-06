import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Avatar from './Avatar';

import { FaRegImage } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';

const Conversations = () => {
  const { socket, currentUser } = useSelector(state => state.user);
  const user = useSelector(state => state.user);
  const [conversations, setConversations] = useState([]);


  useEffect(() => {
    if (socket) {
      socket.emit('getConversations', currentUser._id);

      socket.on('conversations', (conversations) => {
        setConversations(conversations);
        console.log(conversations);
      })
    }
  }, [socket, user])
  return (
    <div>
      {conversations.map(conversation => (
        <NavLink className='conversation flex gap-2 items-center p-2 rounded-xl hover:bg-gray-200 cursor-pointer' key={conversation._id} to={`${conversation.sender}`}>

          <Avatar imgUrl={conversation.profile} size={12} />

          <div>
            <p className='font-bold'>{conversation.name}</p>

            <div className='flex gap-2 items-center'>
              {conversation.lastMessage?.imageUrl && <FaRegImage />}
              {conversation.lastMessage?.text && <p className={`${conversation.totalUnSeen > 0 ? `font-bold`: `font-light text-gray-800 `}  text-sm`}>
                {conversation.lastMessage?.text.length > 20 ? conversation.lastMessage.text.slice(0, 20) + '....' : conversation.lastMessage.text}
              </p>}
            </div>

          </div>
          {conversation.totalUnSeen > 0 && <div className='ml-auto size-2 bg-blue-700 rounded-full'></div>}

        </NavLink>

      ))}
    </div>
  )
}

export default Conversations