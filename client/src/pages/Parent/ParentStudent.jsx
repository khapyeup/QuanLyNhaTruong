import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

import { useGetStudentByParentQuery } from "../../redux/studentRelated/studentApiSlice"
import Loading from '../component/Loading'
import { FaEye } from "react-icons/fa";

function ParentStudent() {
  const [search, setSearch] = useState('');

  const { currentUser } = useSelector(state => state.user);
  const { data: studentList, isLoading, isError } = useGetStudentByParentQuery(currentUser._id);

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase())
  }


  return (
    <div className='flex flex-col gap-6 p-10'>
      <h1 className='font-bold text-2xl'>Danh sách học sinh </h1>
      <input className='rounded-lg p-2 border border-gray-400' placeholder='Tìm kiếm học sinh theo tên, lớp...' onChange={handleSearch}/>
      {isLoading ? <Loading /> : !isError && <table className='table-auto w-full text-left shadow-md border text-gray-700'>
        <thead>
          <tr>
            <td className='p-4 border-b border-gray-300'>HỌ VÀ TÊN</td>
            <td className='p-4 border-b border-gray-300'>LỚP</td>
            <td className='p-4 border-b border-gray-300'>NĂM SINH</td>
            <td className='p-4 border-b border-gray-300'>GIỚI TÍNH</td>
            <td className='p-4 border-b border-gray-300'>HÀNH ĐỘNG</td>
          </tr>

        </thead>
        <tbody>
          {studentList.filter(student => student.class_id.name.toLowerCase().includes(search)||student.name.toLowerCase().includes(search)).map(student =>
            <tr key={student._id} className='hover:bg-gray-200'>
              <td className='p-4 border-b border-gray-300 text-black'>{student.name}</td>
              <td className='p-4 border-b border-gray-300 text-black'>{student.class_id.name}</td>
              <td className='p-4 border-b border-gray-300 text-black'>{student.dob}</td>
              <td className='p-4 border-b border-gray-300 text-black'>{student.gender}</td>
              <td className='p-4 border-b border-gray-300 text-black'><Link to={`/parent/student/${student._id}`}><FaEye className='hover:text-red-700 cursor-pointer'/></Link>
              </td>
            </tr>)}
        </tbody>
      </table>}
    </div>
  )
}

export default ParentStudent