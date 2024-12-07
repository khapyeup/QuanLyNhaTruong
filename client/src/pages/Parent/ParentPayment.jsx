import { useSelector } from 'react-redux'
import { useGetStudentByParentQuery } from '../../redux/studentRelated/studentApiSlice';
import Loading from '../component/Loading';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


function ParentPayment() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("")

  const { currentUser } = useSelector(state => state.user);

  const tableHead = ["STT", "Họ và tên", "Lớp"];

  const { data: studentList, isLoading, isError } = useGetStudentByParentQuery(currentUser._id);

  return (<div className='p-10 flex flex-col gap-10'>
    <h1 className='font-bold text-2xl'>Danh sách học sinh</h1>
    {isLoading ? <Loading /> : !isError && <div>
      <p className='mb-4'>Chọn một học sinh bên dưới để xem chi tiết</p>
      <table className="w-full table-auto text-left">
        <thead>
          <tr>
            {tableHead.map((head) => (
              <th
                key={head}
                className="p-4 border-b border-b-gray-400 bg-gray-200"
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {studentList
            ?.filter(
              (student) =>
                student.name.toLowerCase().includes(search) ||
                student.class_id.name.toLowerCase().includes(search)
            )
            .map((student, index) => (
              <tr
                onClick={() => navigate(`/parent/payments/${student._id}`)}
                key={student._id}
                className="border-b border-b-gray-400 hover:bg-gray-200 cursor-pointer"
              >
                <td className="p-4">{index + 1}</td>
                <td className="p-4">{student.name}</td>
                <td className="p-4">{student.class_id.name}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>}
  </div>
  )
}

export default ParentPayment