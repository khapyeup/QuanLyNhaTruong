import { Link, useParams } from "react-router-dom";
import {
  useAddFeedbackMutation,
  useDeleteRecordMutation,
  useGetProgressRecordsQuery,
  useUpdateSeenStatusMutation,
} from "../../../redux/progressRelated/progressApiSlice";
import { useState } from "react";
import { toast } from "react-toastify";
import { format } from "date-fns";
import Loading from "../../component/Loading";
//Icon
import { FaExclamation } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { useSelector } from "react-redux";

const ProgressRecords = () => {
  //Get studentId from url params
  const { id } = useParams();

  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [selectedRecordId, setSelectedRecordId] = useState("");
  const [feedback, setFeedback] = useState("");

  const { currentRole } = useSelector((state) => state.user);

  const { data, isLoading } = useGetProgressRecordsQuery(id);
  const [postFeedback] = useAddFeedbackMutation();
  const [updateSeenStatus] = useUpdateSeenStatusMutation();
  const [deleteRecord] = useDeleteRecordMutation();
  const categories = [
    "Tất cả",
    "Nhận thức",
    "Giao tiếp",
    "Cảm xúc",
    "Ngôn ngữ",
    "Thể chất",
  ];
  const filteredRecords =
    selectedCategory === "Tất cả"
      ? data
      : data.filter((record) => record.category === selectedCategory);
  console.log(filteredRecords);

  const addFeedback = () => {
    if (!feedback) return toast.warning("Chưa nhập ý kiến");

    const data = { id: selectedRecordId, feedback: feedback };
    postFeedback(data)
      .unwrap()
      .then((response) => toast.success(response.message));
  };

  const handleDeleteRecord = (id) => {
    setSelectedRecordId("");
    deleteRecord(id)
      .unwrap()
      .then((response) => toast.success(response.message));
  };

  const updateSeen = (data) => {
    updateSeenStatus(data);
  };
  return (
    <>
      {isLoading ? (
        <Loading size={16} />
      ) : (
        <div className="flex">
          {/* Hien thi categories */}
          <div className="w-36 flex flex-col gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`${
                  selectedCategory === category && `bg-red-600 text-white`
                } border border-red-600 p-2 rounded-md  `}
              >
                {category} (
                {
                  data?.filter(
                    (record) =>
                      category === "Tất cả" || record.category === category
                  ).length
                }
                )
              </button>
            ))}
          </div>
          {/* Hien thi bao cao */}

          <div className="w-full pl-6">
            {filteredRecords?.length === 0 ? (
              <p className="text-center p-2 italic">
                Không có bản báo cáo nào😒
              </p>
            ) : (
              filteredRecords?.map((record, recordIndex) => (
                <div
                  key={record._id}
                  className="border border-gray-300 shadow-md rounded-md p-4 relative mb-10"
                >
                  {!record.seen && currentRole === "parent" && (
                    <FaExclamation className="animate-ping text-red-700 text-2xl right-2 -top-3 absolute " />
                  )}
                  <h1 className="text-center font-bold text-2xl text-red-400">
                    {record.category}
                  </h1>
                  <p className="font-bold">
                    Ngày:{" "}
                    <span className="font-thin">
                      {format(record.date, "dd/MM/yyyy")}
                    </span>
                  </p>
                  <p className="font-bold">
                    Quan sát:{" "}
                    <span className="font-thin">{record.observation}</span>
                  </p>
                  <p className="font-bold">
                    Lời nhắn giáo viên:{" "}
                    <span className="font-thin">{record.teacherNotes}</span>
                  </p>
                  <p className="font-bold">Hình ảnh: </p>
                  {record.evidence.length === 0 ? (
                    <p>Không có hình ảnh</p>
                  ) : (
                    <div className="flex gap-2 flex-wrap">
                      {record.evidence.map((data, index) => (
                        <div key={index}>
                          <img className="size-72 rounded-sm" src={data.url} />
                          <p className="text-xs">{data.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  <p className="font-bold">Ý kiến phụ huynh:</p>
                  <p>{record.parentFeedback}</p>

                  <div className="flex flex-col gap-2 mb-6">
                    {currentRole === "parent" && (
                      <button
                        onClick={() => setSelectedRecordId(record._id)}
                        type="submit"
                        className={
                          selectedRecordId == record._id
                            ? "hidden"
                            : " p-2 border border-red-600 rounded-md hover:bg-red-600 hover:text-white"
                        }
                      >
                        Thêm ý kiến phụ huynh
                      </button>
                    )}

                    <div
                      className={`${
                        selectedRecordId === record._id ? `block` : `hidden`
                      } flex items-center gap-2`}
                    >
                      <input
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        className="w-full p-2 border border-gray-500 rounded-md"
                      />
                      <IoSend
                        onClick={addFeedback}
                        className="hover:text-red-500 rounded text-xl cursor-pointer"
                      />
                    </div>
                  </div>
                  {currentRole === "parent" && (
                    <button
                      onClick={() => updateSeen(record._id)}
                      disabled={record.seen}
                      className="disabled:bg-gray-400 disabled:border-0 disabled:text-white p-2 border mr-4 border-red-600 rounded-md hover:bg-red-600 hover:text-white"
                    >
                      Đánh dấu đã xem
                    </button>
                  )}

                  {currentRole === "admin" && (
                    <Link
                      to={`/admin/students/view/${id}/record/${record._id}/update`}
                    >
                      <button className="mr-4 p-2 border border-red-600 rounded-md hover:bg-red-600 hover:text-white">
                        Chỉnh sửa
                      </button>
                    </Link>
                  )}
                  {currentRole === "admin" && (
                    <button
                      onClick={() => handleDeleteRecord(record._id)}
                      className="p-2 border border-red-600 rounded-md hover:bg-red-600 hover:text-white"
                    >
                      Xoá
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProgressRecords;
