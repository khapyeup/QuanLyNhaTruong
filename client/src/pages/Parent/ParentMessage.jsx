import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserChat } from '../../redux/chatRelated/chatHandle'
import { getUserDetails } from '../../redux/userRelated/userHandle';


function ParentMessage() {
  const dispatch = useDispatch();

  const { userChat, loading } = useSelector(state => state.chat);
  const { currentUser, userDetails } = useSelector(state => state.user);

  
 

  useEffect(() => {
    dispatch(getUserChat(currentUser._id));
  }, [])
  return <>
    {loading ? (<p>Đang tải</p>) : (
      <div className='container'>

        {userChat.length > 0 ? (
          //  ben trai
          <div className='flex h-full'>
            <div className='w-1/4 h-screen overflow-y-auto border py-4 min-w-1/4'>
              <p className='font-bold text-xl mb-5'>Danh sách chat</p>

              {userChat.map(chat => (
                <div className='p-2 rounded-lg hover:bg-gray-200 bg-gray-200' key={chat._id}>
                  <h2 className='font-bold'>Teacher1</h2>
                  <p>Chào cô giáo</p>
                </div>
              ))}
            </div>

            {/* BenPhai */}
            <div className='flex-1'>
              <header class="bg-white p-4 border">
                <h1 class="text-2xl font-semibold">Teacher1</h1>
              </header>
            </div>
          </div>
        ) : <p>Không có đoạn chat nào</p>}
      </div>
    )}
  </>



}

export default ParentMessage