import Avatar  from '../component/Avatar'
import React from 'react'
import {Link} from 'react-router-dom'

const UserSearchCard = ({user, onClose}) => {
  return (
    <Link onClick={onClose} to={`${user._id}`} className='flex gap-5 items-center hover:bg-gray-300 cursor-pointer rounded font-sans p-2'>
      <Avatar userId={user._id} size={12} imgUrl={user.profile} />
      <p>{user.teacherInfo.name}</p>
    </Link>
  )
}

export default UserSearchCard