import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const Conversations = () => {
    const {socket, currentUser} = useSelector(state => state.user);
    const user = useSelector(state => state.user);
    
    useEffect(()=>{
        if (socket) {
            socket.emit('getConversations', currentUser._id);
            
            socket.on('conversations', (conversations) => {
                console.log(conversations)
            })
        }
    }, [socket, user])
  return (
    <div>Conversations</div>
  )
}

export default Conversations