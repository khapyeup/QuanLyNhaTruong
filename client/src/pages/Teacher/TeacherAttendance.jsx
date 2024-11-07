import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { format } from 'date-fns'

import { getClassList } from '../../redux/sclassRelated/sclassHandle';
import AttendanceTable from '../component/AttendanceTable';



const TeacherAttendance = () => {
    const dispatch = useDispatch();
    const [selectedClassId, setSelectedClassId] = useState('');
    const { classList, loading } = useSelector(state => state.sclass);
    const [day, setDay] = useState(format(new Date(), 'yyyy-MM-dd'));

    useEffect(() => {
        dispatch(getClassList());
    }, [])

    
    
    return (
        <div className='flex flex-col gap-5 p-5'>
            <div className='flex flex-row gap-2'>
                <p>Điểm danh ngày:</p>
                <input onChange={(e) => setDay(e.target.value)} type='date' value={day} />
            </div>

            {loading ? <p>Đang tải lớp</p> : (
                <div>
                    <label htmlFor='class'>Lớp </label>
                    <select id='class' className='p-2 bg-gray-300 rounded-lg' onChange={(e) => setSelectedClassId(e.target.value)}>
                        <option value=''></option>
                        {classList.map(sclass =>
                            <option key={sclass._id} value={sclass._id}>{sclass.name}</option>
                        )
                        }
                    </select>
                </div>
            )}

            {/* Table display student */}
            <AttendanceTable day={day} classId={selectedClassId}/>


        </div>
    )
}

export default TeacherAttendance