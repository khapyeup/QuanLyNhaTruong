import React from 'react'
import {Link} from 'react-router-dom'

const UserSearchCard = ({user}) => {
  return (
    <Link to={`messages/${user._id}`} className='flex gap-5 items-center hover:bg-gray-300 cursor-pointer rounded font-sans p-2'>
      <img className='size-12 rounded-full ' src={`/${user.profile}`} />
      <p>{user.teacherInfo.name}</p>
    </Link>
  )
}

export default UserSearchCard