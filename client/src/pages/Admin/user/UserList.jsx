import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-tailwind/react'
import { Link } from 'react-router-dom'

import { getUserList } from '../../../redux/userRelated/userHandle';

import { CiCircleInfo } from "react-icons/ci";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";


const UserList = () => {

  const dispatch = useDispatch();

  const { userList } = useSelector(state => state.user);
  console.log(userList)
  useEffect(() => {
    dispatch(getUserList());
  }, [])
  return (
    <div className=''>
      <div className='flex flex-col md:flex-row justify-between m-4'>

        <Link to={'/admin/user/add'}>
          <Button>Thêm tài khoản phụ huynh</Button>
        </Link>

        <div className='flex gap-3'>
          <select>
            <option>Chọn lớp</option>
          </select>
          <Button>Lọc</Button>
        </div>
      </div>

      {/* Danh sach tai khoan */}
      <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {userList.map(item => (
          <div key={item._id} className='border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl'>
            <h2 className='px-4 py-1 bg-red-300 rounded-lg'>Loại tài khoản: {item.role}</h2>

            <h4>{item._id}</h4>

            <div className='flex flex-col justify-start item-center gap-x-2'>
              <h2 className='my-1'>Tên đăng nhập: {item.username}</h2>
              <h2 className='my-1'>Lớp {item.class_id.map(item => `${item.name}, `)}</h2>
            </div>

            <div className='flex justify-between items-center gap-x-2 p-4'>
              <Link>
                <CiCircleInfo className='text-blue-700 text-2xl' />
              </Link>
              <Link to={`/admin/user/${item._id}`}>
                <MdOutlineModeEditOutline className='text-orange-600 text-2xl' />
              </Link>
              <Link onClick={() => alert('Chức năng xóa đang tạm khóa')}>
                <MdDelete className='text-red-500 text-2xl' />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserList