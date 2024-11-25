import { toast } from "react-toastify";
import Loading from "../../component/Loading";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";

import { useDeleteNoticeMutation, useGetNoticeListQuery } from "../../../redux/noticeRelated/noticeApiSlice";
//Icon
import { FaEye } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

const ShowNotice = () => {
  const {
    data: noticeList = [],
    isLoading,
  } = useGetNoticeListQuery();
  const [deleteNotice] = useDeleteNoticeMutation();
  const [search, setSearch] = useState("");
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [selectedNoticeId, setSelectedNoticeId] = useState('');
  

  const tableHead = ["STT", "Tiêu đề", "Hành động"];

  const handleDeleteModal = (id) => {
    setIsOpenDeleteModal(!isOpenDeleteModal);
    setSelectedNoticeId(id);
  };

  const handleDelete = () => {
    deleteNotice(selectedNoticeId).unwrap().then((response) => toast.success(response.message)).finally(handleDeleteModal(""));
  }

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  
  return (
    <>
      {isLoading ? (
        <Loading size={12} />
      ) : (
        <div className="p-10 flex flex-col gap-6">
          <h1 className="text-2xl font-bold">
            Thông báo <span>({noticeList.length})</span>
          </h1>
          <div className="flex flex-col md:flex-row justify-between ">
            <Link to="/admin/notices/add">
              <button className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700">
                Thêm thông báo
              </button>
            </Link>
            <div className="relative">
              <FaSearch className="absolute left-2 top-[10px]" />
              <input
                className="p-2 ps-8 text-sm text-gray-900 border border-gray-400 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                placeholder="Tiêu đề..."
                onChange={handleSearch}
              />
            </div>
          </div>

          <table className="w-full table-auto text-left">
            <thead>
              <tr>
                {tableHead.map((head) => (
                  <th
                    key={head}
                    className="py-4 px-2 border-b border-b-gray-400"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {noticeList
                .filter(
                  (notice) =>
                    notice.title.toLowerCase().includes(search)
                )
                .map((notice, index) => (
                  <tr key={notice._id} className="border-b border-b-gray-400">
                    <td className="px-2 py-4">{index + 1}</td>
                    <td className="px-2 py-4">{notice.title}</td>
      
                    <td className="px-2 py-4 flex gap-4 flex-wrap">
                      <Link to={`/admin/notices/view/${notice._id}`}>
                        <FaEye className="text-lg hover:text-red-800 cursor-pointer" />
                      </Link>
                      <Link to={`/admin/notices/edit/${notice._id}`}>
                        <FaPencilAlt className="text-lg hover:text-red-800 cursor-pointer" />
                      </Link>
                      <RiDeleteBin6Line
                        onClick={() => handleDeleteModal(notice._id)}
                        className="text-lg hover:text-red-800 cursor-pointer"
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>


          <Dialog open={isOpenDeleteModal} handler={handleDeleteModal}>
            <DialogHeader>Xác nhận xoá chứ? 😢</DialogHeader>
            <DialogBody>Một khi đã xoá thì không thể hoàn tác lại</DialogBody>
            <DialogFooter>
              <button onClick={() => handleDeleteModal("")} className=" text-black hover:bg-gray-400 px-4 py-1 rounded mr-4">Không</button>
              <button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded">OK</button>
            </DialogFooter>
          </Dialog>
        </div>
      )}
    </>
  );
};

export default ShowNotice;
