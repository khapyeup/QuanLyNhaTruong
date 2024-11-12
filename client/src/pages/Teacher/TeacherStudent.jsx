import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudentByClass } from "../../redux/studentRelated/studentHandle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../component/Loading";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

function TeacherStudent() {
  const dispatch = useDispatch();
  const { studentList, error, loading } = useSelector((state) => state.student);
  const [q, setQ] = useState("");

  useEffect(() => {
    dispatch(getStudentByClass("67189ee0f51b43da8d11ca31"));
  }, [dispatch]);

  useEffect(() => {
    toast.error(error);
  }, [error]);

  console.log(q);
  return (
    <>
      {loading ? (
        <Loading size={12} />
      ) : (
        <div className="p-5">
          <input
            className="p-2 bg-gray-200 rounded-lg mb-5 w-56"
            onChange={(e) => setQ(e.target.value.toLowerCase())}
            placeholder="Tìm kiếm theo tên và lớp..."
          />

          <table className="w-full text-left table-auto text-gray-800">
            <thead>
              <tr className="text-gray-500 border-b border-gray-300 bg-gray-300 font-normal text-sm">
                <th className="p-4">ID</th>
                <th className="p-4">Họ và tên</th>
                <th className="p-4">Lớp</th>
                <th className="p-4">Năm sinh</th>
                <th className="p-4">Giới tính</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {studentList
                .filter((student) => student.name.toLowerCase().includes(q) || student.class_id.name.toLowerCase().includes(q))
                .map((student, index) => (
                  <tr className="hover:bg-gray-200" key={student._id}>
                    <td className="p-4 text-sm">{index + 1}</td>
                    <td className="p-4 text-sm font-bold">{student?.name}</td>
                    <td className="p-4 text-sm">{student?.class_id.name}</td>
                    <td className="p-4 text-sm">{student?.dob}</td>
                    <td className="p-4 text-sm">{student?.gender}</td>
                    <td className="p-4">
                      <Link to={`${student._id}`}>
                        <FaEye className="cursor-pointer hover:text-red-400 transition-colors" />
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
      <ToastContainer />
    </>
  );
}

export default TeacherStudent;
