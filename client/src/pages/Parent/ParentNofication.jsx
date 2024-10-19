import React, { useEffect } from 'react'
import { getNoticeList } from '../../redux/noticeRelated/noticeHandle'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const ParentNofication = () => {
    const dispatch = useDispatch();

    const { noticeList } = useSelector(state => state.notice);

    useEffect(() => {
        dispatch(getNoticeList());
    },[])

    return (
        <ul>
            {noticeList ? noticeList.map((notice) => 
                <Link to='/parent/notice'><li className='list-none p-1 border-y-2 border-y-gray-500 hover:bg-blue-gray-300 cursor-pointer' key={notice._id}>{notice.title}</li></Link>
            ) : <li>Không có thông báo nào!</li>}

        </ul>
    )
}

export default ParentNofication