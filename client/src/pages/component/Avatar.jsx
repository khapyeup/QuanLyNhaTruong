import React from 'react'
import { useSelector } from 'react-redux'

const Avatar = ({userId , size, imgUrl }) => {
    const { onlineUsers } = useSelector(state => state.user);
    const isOnline = onlineUsers.includes(userId);
    return (
        <div className='relative'>
            <img src={ imgUrl} className={`size-${size} rounded-full`} />
            {isOnline && (
                <div className='absolute right-0 bottom-[1px] size-3 border-white border-2 bg-green-700 rounded-full'></div>
            ) 
            }
           
        </div>
        
    )
}

export default Avatar