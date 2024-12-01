import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Loading from "../../component/Loading";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

import {
  useAddSclassMutation,
  useDeleteSclassMutation,
  useEditSclassMutation,
  useGetSclassListQuery,
} from "../../../redux/sclassRelated/sclassApiSlice";
//Icon
import { FaPencilAlt } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";

function ShowClasses() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { data: classList, isLoading } = useGetSclassListQuery();
  const [addSclass] = useAddSclassMutation();
  const [editSclass] = useEditSclassMutation();
  const [deleteSclass] = useDeleteSclassMutation();

  const [search, setSearch] = useState("");
  const [selectedSclassId, setSelectedSclassId] = useState("");
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };
  const handleAddModal = () => {
    setIsOpenAddModal(!isOpenAddModal);
  };
  const handleEditModal = (id) => {
    setIsOpenEditModal(!isOpenEditModal);
    setSelectedSclassId(id);

    setValue("name", classList.find((sclass) => sclass._id === id)?.name);
  };
  const handleDeleteModal = (id) => {
    setIsOpenDeleteModal(!isOpenDeleteModal);
    setSelectedSclassId(id);
  };

  const handleAdd = (data) => {
    addSclass(data)
      .unwrap()
      .then((response) => toast.success(response.message))
      .finally(setIsOpenAddModal(false));
  };
  const handleEdit = (data) => {
    data._id = selectedSclassId;
    editSclass(data)
      .unwrap()
      .then((response) => toast.success(response.message))
      .finally(setIsOpenEditModal(false));
  };
  const handleDelete = () => {
    deleteSclass(selectedSclassId)
      .unwrap()
      .then((response) => toast.success(response.message))
      .finally(setIsOpenDeleteModal(false));
  };

  return (
    <>
      {isLoading ? (
        <Loading size={12} />
      ) : (
        <div className="p-10 flex flex-col gap-6">
          <h1 className="font-bold text-2xl">
            Lớp <span>({classList.length})</span>
          </h1>
          <div className="flex flex-col md:flex-row justify-between ">
            <button
              onClick={handleAddModal}
              className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700"
            >
              Thêm lớp
            </button>

            <div className="relative">
              <FaSearch className="absolute left-2 top-[10px]" />
              <input
                className="p-2 ps-8 text-sm text-gray-900 border border-gray-400 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                placeholder="Tên lớp..."
                onChange={handleSearch}
              />
            </div>
          </div>

          <table className="w-full table-auto text-left">
            <thead>
              <tr>
                <th className="py-4 px-2 border-b border-b-gray-400">STT</th>
                <th className="py-4 px-2 border-b border-b-gray-400">
                  Tên lớp
                </th>
                <th className="py-4 px-2 border-b border-b-gray-400">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {classList
                .filter((sclass) => sclass.name.toLowerCase().includes(search))
                .map((sclass, index) => (
                  <tr key={sclass._id} className="border-b border-b-gray-400">
                    <td className="px-2 py-4">{index + 1}</td>
                    <td className="px-2 py-4">{sclass.name}</td>
                    <td className="px-2 py-4 flex gap-4 flex-wrap">
                      <FaPencilAlt
                        onClick={() => handleEditModal(sclass._id)}
                        className="text-lg hover:text-red-800 cursor-pointer"
                      />

                      <RiDeleteBin6Line
                        onClick={() => handleDeleteModal(sclass._id)}
                        className="text-lg hover:text-red-800 cursor-pointer"
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {/* Modal add new class */}
          <Dialog open={isOpenAddModal} handler={handleAddModal}>
            <DialogHeader>Thêm lớp</DialogHeader>
            <form onSubmit={handleSubmit(handleAdd)}>
              <DialogBody className="flex flex-col gap-2">
                <label htmlFor="name">Tên lớp</label>
                <input
                  {...register("name", { required: true })}
                  id="name"
                  name="name"
                  type="text"
                  className="p-2 rounded-lg border border-gray-400"
                />
              </DialogBody>
              <DialogFooter>
                <button
                  className=" text-black hover:bg-gray-400 px-4 py-1 rounded mr-4"
                  type="button"
                  onClick={() => handleAddModal()}
                >
                  Thôi
                </button>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
                  type="submit"
                >
                  Lưu
                </button>
              </DialogFooter>
            </form>
          </Dialog>
          {/* Modal edit existed class */}
          <Dialog open={isOpenEditModal} handler={handleEditModal}>
            <DialogHeader>Chỉnh sửa lớp</DialogHeader>
            <form onSubmit={handleSubmit(handleEdit)}>
              <DialogBody className="flex flex-col gap-2">
                <label htmlFor="name">Tên lớp</label>
                <input
                  {...register("name", { required: true })}
                  id="name"
                  name="name"
                  type="text"
                  className="p-2 rounded-lg border border-gray-400"
                />
              </DialogBody>
              <DialogFooter>
                <button
                  className=" text-black hover:bg-gray-400 px-4 py-1 rounded mr-4"
                  type="button"
                  onClick={handleEditModal}
                >
                  Thôi
                </button>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
                  type="submit"
                >
                  Lưu
                </button>
              </DialogFooter>
            </form>
          </Dialog>
          {/* Modal delete class */}
          <Dialog open={isOpenDeleteModal} handler={handleDeleteModal}>
            <DialogHeader>Xác nhận xoá chứ? 😢</DialogHeader>
            <DialogBody>Một khi đã xoá thì không thể hoàn tác lại</DialogBody>
            <DialogFooter>
              <button
                onClick={() => handleDeleteModal("")}
                className=" text-black hover:bg-gray-400 px-4 py-1 rounded mr-4"
              >
                Không
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
              >
                OK
              </button>
            </DialogFooter>
          </Dialog>
        </div>
      )}
    </>
  );
}

export default ShowClasses;
