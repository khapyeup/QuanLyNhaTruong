import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { Button } from '@material-tailwind/react';

function ParentStudent() {
  const [search, setSearch] = useState('');

  const { studentList } = useSelector(state => state.student);

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase())
    console.log(search)
  }
  return (
    <div>
      <div className='p-9 flex flex-col gap-y-5'>
        <div className='flex flex-col gap-2 lg:flex-row lg:justify-between'>

          <input className='w-1/5 border-2 border-black p-1 rounded-lg' placeholder='Tìm kiếm' onChange={handleSearch} />

        </div>

        <table className='w-full min-w-full table-auto text-left'>
          <thead className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
            <tr>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">ID</th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Họ và tên
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Ngày sinh
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Giới tính</th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Lớp</th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 "></th>
            </tr>
          </thead>
          <tbody>
            {studentList.filter((item) => {
              return search.toLowerCase() === '' ? item : (item.name.toLowerCase().includes(search) || item.class_id.name.toLowerCase().includes(search))
            }).map((student, index) =>
              <tr key={index} className="even:bg-blue-gray-50/50">
                <td className='p-4'>{index + 1}</td>
                <td className='p-4'>{student.name}</td>
                <td className='p-4'>{student.dob}</td>
                <td className='p-4'>{student.gender}</td>
                <td className='p-4'>{student.class_id.name}</td>
                <td className="p-4 justify-evenly flex">

                  <Link to={`/admin/students/view/${student._id}`}>
                    <Button className="bg-green-700">Chi tiết</Button>
                  </Link>

                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ParentStudent