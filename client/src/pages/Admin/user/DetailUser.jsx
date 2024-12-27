import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getParentList } from '../../../redux/parentRelated/parenHandle';

const DetailUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [parent, setParent] = useState(null);

  const { parentList } = useSelector(state => state.parent);

  useEffect(() => {
    // Fetch the parent list if it's not already loaded
    if (parentList.length === 0 || !parentList)
      dispatch(getParentList());

  }, [dispatch, parentList]);

  useEffect(() => {

    setParent(parentList.find((item) => item._id === id));
    console.log(parent)
  }, [parentList, id])
  return (
    <>
      {parent ? (
        <div className=' p-4 flex flex-col gap-3'>
          <p className='font-bold mb-5 text-xl'>Thông tin tài khoản</p>

          {/* Div chứa ảnh với tên tài khoản */}
          <div className='border-2 rounded-xl flex flex-col md:flex-row gap-6 p-5 items-center shadow-lg'>
            <img className='size-32 rounded-full ' src={parent.profile} />
            <div>
              <p className='font-bold'>{parent.username}</p>
            </div>
          </div>

          {/* Div chứa thông tin phụ huynh cha*/}
          <div className='border-2 rounded-xl flex flex-col gap-6 p-5 shadow-lg '>
            <p className='font-bold text-lg'>Thông tin cha</p>

            <div className='grid grid-cols-1 md:grid-cols-2 md:grid-rows-3 gap-3'>
              <div className='flex flex-col '>
                <p className='text-gray-500'>Họ tên</p>
                <p className=''>{parent.parentInfo.fatherName}</p>
              </div>
              <div className='flex flex-col gap-1'>
                <p className='text-gray-500'>Tuổi</p>
                <p className=''>{parent.parentInfo.fatherAge}</p>
              </div>
              <div className='flex flex-col gap-1'>
                <p className='text-gray-500'>Email</p>
                <p className=''>{parent.parentInfo.fatherEmail}</p>
              </div>
              <div className='flex flex-col gap-1'>
                <p className='text-gray-500'>Căn cước công dân</p>
                <p className=''>{parent.parentInfo.fatherPassport}</p>
              </div>
              <div className='flex flex-col gap-1'>
                <p className='text-gray-500'>Số điện thoại</p>
                <p className=''>{parent.parentInfo.fatherPhone}</p>
              </div>





            </div>
          </div>

          {/* Div chứa thông tin phụ huynh mẹ*/}
          <div className='border-2 rounded-xl flex flex-col gap-6 p-5 shadow-lg'>
            <p className='font-bold text-lg'>Thông tin mẹ</p>

            <div className='grid grid-cols-1 md:grid-cols-2 md:grid-rows-3 gap-3'>
              <div className='flex flex-col '>
                <p className='text-gray-500'>Họ tên</p>
                <p className=''>{parent.parentInfo.motherName}</p>
              </div>
              <div className='flex flex-col gap-1'>
                <p className='text-gray-500'>Tuổi</p>
                <p className=''>{parent.parentInfo.motherAge}</p>
              </div>
              <div className='flex flex-col gap-1'>
                <p className='text-gray-500'>Email</p>
                <p className=''>{parent.parentInfo.motherEmail}</p>
              </div>
              <div className='flex flex-col gap-1'>
                <p className='text-gray-500'>Căn cước công dân</p>
                <p className=''>{parent.parentInfo.motherPassport}</p>
              </div>
              <div className='flex flex-col gap-1'>
                <p className='text-gray-500'>Số điện thoại</p>
                <p className=''>{parent.parentInfo.motherPhone}</p>
              </div>
            </div>
          </div>

          {/* Div chứa danh sách các học sinh mà tài khoản quản lí */}
          <div className='border-2 rounded-xl flex flex-col gap-6 p-5 shadow-lg'>
            <p className='font-bold text-lg'>Đứa trẻ</p>
            <ul>
              {parent.parentInfo?.student_id.length !== 0 ? parent.parentInfo?.student_id.map((student) => (
                <li key={student._id}>{student.name}</li>
              )) : (
                <li>Không có đứa trẻ nào</li>
              ) }
            </ul>
          </div>
      
        </div >
      ) : (<p>Không tìm thấy user!</p>)}

    </>
  )
}

export default DetailUser