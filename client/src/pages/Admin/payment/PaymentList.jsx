import { Link, useNavigate } from "react-router-dom";
import { useGetStudentListQuery } from "../../../redux/studentRelated/studentApiSlice";
import { useState } from "react";


export default function PaymentList() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const tableHead = ["STT", "Họ và tên", "Lớp"];

  const { data: studentList } = useGetStudentListQuery();

  return (
    <>

      <div className="p-6">
        <Link
          className="bg-black text-white p-2 rounded-md"
          to={"/admin/payments/assigntostudent"}
        >
          Gán học phí
        </Link>
        <p className="mt-6 mb-2 font-bold text-xl">Danh sách học sinh</p>
        <div className="shadow border border-gray-300 rounded-lg">
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
                    onClick={() => navigate(`/admin/payments/${student._id}`)}
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
        </div>
      </div>
    </>
  );
}
