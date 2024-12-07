import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AttendanceTable = ({ day, classId }) => {
    const [students, setStudents] = useState([]);
    const [attendance, setAttendance] = useState({});

    const handleAttendanceChange = (studentId, status) => {
        setAttendance(prev => ({ ...prev, [studentId]: status }))
    }

    // Set attendance status for all students at once
    const setAllAttendance = (status) => {
        const updated = {};
        students.forEach(student => {
            updated[student._id] = status;
        })
        setAttendance(updated);
    }

    //Send post request
    const handleSave = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(`http://localhost:3000/students/${classId}/attendance`, { attendance, day })
            if (response.data.message)
                toast.success(response.data.message);
            else if (response.data.error)
                toast.error(response.data.error);

        } catch (error) {
            toast.error(error.message);
        }

    }
  
    useEffect(() => {
        if (classId) {
            const fetchStudent = async () => {
                const response = await axios.get(`http://localhost:3000/students/class/${classId}`);
                setStudents(response.data);
            }

            fetchStudent();
        }

    }, [classId])

    
    return (
        <>
           
            {students.length > 0 ? (
                <form onSubmit={handleSave}>

                    <button type='button' className='bg-green-300 px-2 py-1 rounded-md hover:bg-green-400 mr-2' onClick={() => setAllAttendance("Hiện diện")}>Tất cả hiện diện</button>
                    <button type='button' className='bg-red-300 px-2 py-1 rounded-md hover:bg-red-400' onClick={() => setAllAttendance("Vắng")}>Tất cả vắng</button>

                    <table className='table-auto mt-5 w-full text-left'>
                        <thead className='uppercase text-xs'>
                            <tr>
                                <th className='px-6 py-4'>STT</th>
                                <th className='px-6 py-4'>Họ và tên</th>
                                <th className='px-6 py-4'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, index) => (
                                <tr className='odd:bg-white even:bg-gray-100 border-b' key={student._id}>
                                    <td className='px-6 py-4'>{index + 1}</td>
                                    <td className='px-6 py-4'>{student.name}</td>
                                    <td className='px-6 py-4 flex flex-row gap-5 item-center'>
                                        <div className='item-center flex gap-2'>
                                            <input
                                                id={`attendance_${student._id}`}
                                                type="radio"
                                                name={`attendance_${student._id}`}
                                                value="Hiện diện"
                                                onChange={() => handleAttendanceChange(student._id, 'Hiện diện')}
                                                checked={attendance[student._id] === 'Hiện diện'}
                                                required
                                            />
                                            <label htmlFor={`attendance_${student._id}`}>
                                                Hiện diện
                                            </label>

                                        </div>

                                        <div className='item-center flex gap-2'>
                                            <input
                                                id={`absend_${student._id}`}
                                                type="radio"
                                                name={`attendance_${student._id}`}
                                                value="Vắng"
                                                onChange={() => handleAttendanceChange(student._id, 'Vắng')}
                                                checked={attendance[student._id] === 'Vắng'}
                                                required
                                            />
                                            <label htmlFor={`absend_${student._id}`}>
                                                Vắng
                                            </label>
                                        </div>


                                    </td>
                                </tr>

                            ))}
                        </tbody>
                    </table>
                    <button type='submit' className='bg-blue-500 mt-5 text-white px-3 py-1 rounded-lg hover:bg-blue-600'>Lưu</button>
                </form>

            ) : (<p>Không có học sinh nào!</p>)}
        </>

    )
}

export default AttendanceTable