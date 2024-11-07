import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProgressBar from './ProgressBar';

const TotalAbsent = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const response = await axios.get('http://localhost:3000/students/total-attendance-today');
                setData(response.data);
            } catch (error) {
                alert('Có lỗi')
                console.log(error.message || 'Error: ' + error);
            }
        }

        fetchAttendance();
    }, [])

    return (
        <div className='p-2 bg-cyan-200 flex flex-col gap-2'>
            <p>Số học sinh có mặt hôm nay</p>
            <ProgressBar value={data?.percent}/>
            <p className='text-center'>{data?.attendance}/{data?.totalStudent}</p>
        </div>
    )
}

export default TotalAbsent