import { useState } from "react";

import "react-toastify/dist/ReactToastify.css";
import Loading from "../component/Loading";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGetStudentListQuery } from "../../redux/studentRelated/studentApiSlice";

function TeacherStudent() {
  const [search, setSearch] = useState("");

  const { data: studentList, isLoading, isError } = useGetStudentListQuery();

  if (isError) return <p>Có lỗi khi load dữ liệu</p>;
  if (isLoading) return <Loading size={12} />;

  const tableHead = ["STT", "Tên học sinh", "Lớp", "Hành động"];

  return (
    <div className="p-5">
      <input
        className="p-2 bg-gray-200 rounded-lg mb-5 w-56"
        onChange={(e) => setQ(e.target.value.toLowerCase())}
        placeholder="Tìm kiếm theo tên và lớp..."
      />

      <table className="w-full table-auto text-left">
        <thead>
          <tr>
            {tableHead.map((head) => (
              <th key={head} className="py-4 px-2 border-b border-b-gray-400">
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {studentList
            .filter(
              (student) =>
                student.name.toLowerCase().includes(search) ||
                student.class_id.name.toLowerCase().includes(search)
            )
            .map((student, index) => (
              <tr key={student._id} className="border-b border-b-gray-400">
                <td className="px-2 py-4">{index + 1}</td>
                <td className="px-2 py-4">{student.name}</td>
                <td className="px-2 py-4">{student.class_id.name}</td>
                <td className="px-2 py-4 flex gap-4 flex-wrap">
                  <Link to={`/students/${student._id}`}>
                    <FaEye className="text-lg hover:text-red-800 cursor-pointer" />
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default TeacherStudent;
