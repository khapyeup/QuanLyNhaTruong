import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { format } from 'date-fns'

import { getClassList } from '../../redux/sclassRelated/sclassHandle';



const TeacherAttendance = () => {
    const dispatch = useDispatch();
    const [selectedClassId, setSelectedClassId] = useState('');
    const [students, setStudents] = useState([]);
    const { classList, loading } = useSelector(state => state.sclass);
    const [day, setDay] = useState(format(new Date(), 'yyyy-MM-dd'));

    const handleSave = (e) => {
        e.preventDefault();
    }

    useEffect(() => {
        dispatch(getClassList());
    }, [])

    useEffect(() => {
        if (selectedClassId) {
            const fetchStudent = async () => {
                const response = await axios.get(`http://localhost:3000/students/class/${selectedClassId}`);
                setStudents(response.data);
            }

            fetchStudent();
        }

    }, [selectedClassId])
    console.log(day);
    return (
        <div className='flex flex-col gap-5'>
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
            {students.length > 0 ? (
                <form onSubmit={handleSave}>

                    <p className='inline-block'>Chuyển tất cả học sinh thành </p>
                    <label><input type='radio' name='setAll'/> Vắng mặt</label>
                    <label><input type='radio' name='setAll'/> Hiện diện</label>

                    <table className='table-auto'>
                        <thead className='bg-gray-500'>
                            <tr>
                                <th>STT</th>
                                <th>Họ và tên</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, index) => (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{student.name}</td>
                                    <td>
                                        <label><input type='radio' name='status' checked='true' value='Vắng' /> Vắng mặt</label>
                                        <label><input type='radio' name='status' value='Hiện diện' /> Hiện diện</label>
                                    </td>
                                </tr>

                            ))}
                        </tbody>
                    </table>
                    <button type='submit' className='bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600'>Lưu</button>
                </form>
            ) : (<p>Không có học sinh nào!</p>)}


        </div>
    )
}

export default TeacherAttendance