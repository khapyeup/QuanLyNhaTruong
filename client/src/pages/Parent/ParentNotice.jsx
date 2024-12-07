import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getNoticeList } from '../../redux/noticeRelated/noticeHandle';


function ParentNotice() {
    const dispatch = useDispatch();

    const { noticeList } = useSelector(state => state.notice);


    useEffect(() => {
        dispatch(getNoticeList());
    }, [])
    return (
        <div className='flex flex-col gap-10 overflow-y-auto p-10'>
            <h1 className='text-2xl font-bold'>Thông báo</h1>
            <div className='p-4 '>
                {noticeList.map(notice =>
                    <div key={notice._id} className='hover:bg-gray-200 rounded-lg p-4 border border-gray-300 mb-1'>
                        <p className='font-bold text-lg' key={notice._id}>{notice.title}</p>
                        <p>{notice.content}</p>
                    </div>
                )}
            </div>

        </div>
    )
}

export default ParentNotice 