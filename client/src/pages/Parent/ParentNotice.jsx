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
        <div className='flex flex-col gap-4 overflow-y-auto h-screen'>
            {noticeList.map(notice =>
                <div className='shadow-xl p-4 border-y-2 border-y-black'>
                    <p className='font-bold text-lg' key={notice._id}>{notice.title}</p>
                    <p>{ notice.content}</p>
                </div>
            )}
        </div>
    )
}

export default ParentNotice 