import { useState } from "react";
import { format } from "date-fns";
import Loading from "../../component/Loading";
import { FaSearch, FaTimes } from "react-icons/fa";
import {
  useGetAllComplaintsQuery,
  useUpdateComplaintMutation,
} from "../../../redux/complaintRelated/complaintApiSlice";
import { toast } from "react-toastify";

export default function ComplaintList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedComplain, setSelectedComplain] = useState(null);
  const [showModal, setShowModal] = useState(false);
  

  const { data: complaints = [], isLoading } = useGetAllComplaintsQuery();
  const [updateComplaint, { isLoading: isUpdating }] =
    useUpdateComplaintMutation();

  if (isLoading) return <Loading size={12} />;

  const addComment = async (e) => {
    e.preventDefault();
    
    await updateComplaint({
        id: selectedComplain._id,
        response: e.target.response.value
    }).unwrap().then(res => toast.success(res.message)).finally(() => setShowModal(false))
  };

  const updateStatus = async (status) => {
    
    await updateComplaint({
        id: selectedComplain._id,
        status: status
    }).unwrap().then(res => toast.success(res.message)).finally(() => setShowModal(false))
  }

  const filteredComplaints = complaints.filter((complaint) =>
    complaint.title.toLowerCase().includes(searchTerm)
  );
  return (
    <div className=" rounded-lg p-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Danh sách ý kiến</h2>
        <div className="relative">
          <FaSearch className="absolute left-3 top-3 text-gray-500" />
          <input
            type="text"
            placeholder="Tìm ý kiến"
            className="pl-10 pr-4 py-2 border rounded-lg"
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Tiêu đề
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Ngày gửi
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Trạng thái
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredComplaints.map((complaint) => (
              <tr
                key={complaint._id}
                className="border-b hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setShowModal(true);
                  setSelectedComplain(complaint);
                }}
              >
                <td className="px-6 py-4">{complaint.title}</td>
                <td className="px-6 py-4">
                  {format(complaint.createdAt, "dd/MM/yyyy")}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`${
                      complaint.status === "Đang chờ"
                        ? `bg-red-100 text-red-800`
                        : complaint.status === "Đang xem xét"
                        ? `bg-orange-100 text-orange-800`
                        : `bg-green-100 text-green-800`
                    } px-2 py-1 rounded-full text-sm`}
                  >
                    {complaint.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail complaint modal */}
      {showModal && selectedComplain && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-xl">Chi tiết ý kiến</h3>
              <button
                className="hover:text-gray-700 text-gray-500"
                onClick={() => setShowModal(false)}
              >
                <FaTimes size={20} />
              </button>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Người gửi</p>
              <p className="mb-2">{selectedComplain.submittedBy?.parentInfo.fatherName}</p>
              <p className="font-semibold">Tiêu đề</p>
              <p className="mb-2">{selectedComplain.title}</p>
              <p className="font-semibold">Nội dung</p>
              <p className="mb-2">{selectedComplain.description}</p>
              <p className="font-semibold">Ngày gửi</p>
              <p className="mb-2">
                {format(selectedComplain.createdAt, "dd/MM/yyyy")}
              </p>
              <p className="font-semibold">Trạng thái</p>
              <p className="mb-2">{selectedComplain.status}</p>
              <p className="font-semibold">Phản hồi của nhà trường</p>
              <p className="mb-2">
                {selectedComplain.response || "Chưa có phản hồi"}
              </p>
              <form onSubmit={addComment}>
                <input
                  name="response"
                  className="mr-2 p-2 rounded-lg border border-gray-500"
                  type="text"
                  placeholder="Nhập phản hồi..."
                  required
                />
                <button className="p-2 bg-green-500 rounded-lg text-white">
                  Thêm phản hồi
                </button>
              </form>

              <div className="mt-4">
                <button onClick={() => updateStatus("Đang xem xét")} className="p-2 bg-green-500 rounded-lg text-white mr-2">
                  Đánh dấu đang xem xét
                </button>
                <button onClick={() => updateStatus("Đã xử lý")}  className="p-2 bg-green-500 rounded-lg text-white">
                  Đánh dấu đã xử lý
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
