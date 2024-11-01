import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-tailwind/react'
import { Link } from 'react-router-dom'

import { getUserList } from '../../../redux/userRelated/userHandle';

import { CiCircleInfo } from "react-icons/ci";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { getParentList } from '../../../redux/parentRelated/parenHandle';
import { getClassList } from '../../../redux/sclassRelated/sclassHandle';


const UserList = () => {
  const dispatch = useDispatch();

  const [sclassId, setSclassId] = useState('');

  const { parentList } = useSelector(state => state.parent);
  const { classList } = useSelector(state => state.sclass);

  console.log(parentList)

  const handleFilter = (e) => {
    setSclassId(e.target.value);
  }

  useEffect(() => {
    dispatch(getParentList());
    dispatch(getClassList());
  }, [])
  return (
    <div className=''>
      <div className='flex flex-col md:flex-row justify-between m-4'>

        <Link to={'/admin/user/add'}>
          <Button>Thêm tài khoản phụ huynh</Button>
        </Link>

        <div className='flex gap-3'>
          <select onChange={handleFilter}>
            <option value=''>Chọn lớp</option>
            {classList?.map(sclass => (
              <option key={sclass._id} value={sclass._id}>{sclass.name}</option>
            ))}

          </select>
        </div>
      </div>

      {/* Danh sach tai khoan */}
      <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {parentList.filter((parent) =>
          sclassId === '' ? parent : parent.parentInfo.sclass.includes(sclassId))
          .map(item => (
            <div key={item._id} className='border-2 odd:border-red-400 even:border-yellow-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl'>
              <h2 className='px-4 py-1 bg-red-300 rounded-lg'>Loại tài khoản: {item.role}</h2>

              <h4>{item._id}</h4>

              <div className='flex flex-col justify-start item-center gap-x-2'>
                <h2 className='my-1'>Tên đăng nhập: {item.username}</h2>

              </div>

              <div className='flex justify-between items-center gap-x-2 p-4'>
                {/* Button chi tiết */}
                <Link to={`/admin/user/view/${item._id}`}>
                  <CiCircleInfo className='text-blue-700 text-2xl' />
                </Link>
                {/* Button chỉnh sửa */}
                <Link to={`/admin/user/${item._id}`}>
                  <MdOutlineModeEditOutline className='text-orange-600 text-2xl' />
                </Link>
                {/* Button xoá */}
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