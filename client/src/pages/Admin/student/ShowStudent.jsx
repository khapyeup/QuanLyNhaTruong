import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { getStudentList } from '../../../redux/studentRelated/studentHandle';


function ShowStudent() {
  useEffect(() => {

    dispatch(getStudentList())
  }, [])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { studentList, loading, error, response } = useSelector((state) => state.student);

  const handleAddStudent = () => {
    return navigate("/admin/students/add")
  }
  
  return <>
    <div className='p-9'>
      <button class="bg-slate-600 hover:bg-slate-400 p-2 rounded-lg" onClick={handleAddStudent}>Thêm học sinh</button>

      <table className='my-3 w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400 border-collapse text-center'>
        <thead className="text-xs text-gray-700 uppercase bg-gray-400 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3">ID</th>
            <th className="px-6 py-3">
              Họ và tên
            </th>
            <th className="px-6 py-3">
              Tuổi
            </th>
            <th className="px-6 py-3">Lớp</th>
            <th className="px-6 py-3">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {studentList.map((student, index) =>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-slate-400">
              <td className='px-6 py-4'>{index + 1}</td>
              <td className='px-6 py-4'>{student.name}</td>
              <td className='px-6 py-4'>{student.age}</td>
              <td className='px-6 py-4'>{student.class}</td>
              <td className="flex flex-rol items-center px-6 py-4 justify-between">
                <Link to={`/admin/students/view/${student._id}`}>Chi tiết</Link>
                <Link to={`/admin/students/edit/${student._id}`}>Sửa</Link>
                <Link to={`/admin/students/delete/${student._id}`}>Xóa</Link>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

  </>


}

export default ShowStudent