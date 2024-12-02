import {
  useAddFeeMutation,
  useDeleteFeeMutation,
  useEditFeeMutation,
  useGetFeeListQuery,
} from "../../../redux/feeRelated/feeApiSlice";
import { format } from "date-fns";
import Loading from "../../component/Loading";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
//Icons
import { FaPencilAlt, FaTradeFederation } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";

export default function FeeList() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { data: feeList, isLoading, isError } = useGetFeeListQuery();
  const [addFee] = useAddFeeMutation();
  const [updateFee] = useEditFeeMutation();
  const [deleteFee] = useDeleteFeeMutation();

  const tableHead = [
    "Tên",
    "Phí cơ bản",
    "Phí ăn uống",
    "Phí phương tiện",
    "Ngày hết hạn",
    "Hành động",
  ];

  const [selectedFee, setSelectedFee] = useState("");
  const [search, setSearch] = useState("");
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const handleOpenAdd = () => {
    setIsOpenAdd(!isOpenAdd);
  };
  const handleOpenUpdate = (id) => {
    setIsOpenUpdate(!isOpenUpdate);
    setSelectedFee(id);
    const fee = feeList.find(fees => fees._id === id)
    console.log(fee)
   setValue("name", fee?.name)
   setValue("baseFee", fee?.baseFee)
   setValue("mealFee", fee?.mealFee)
   setValue("transportFee", fee?.transportFee)
   setValue("dueDate", format(fee?.dueDate, 'yyyy-MM-dd'))
  };
  const handleOpenDelete = (id) => {
    setIsOpenDelete(!isOpenDelete);
    setSelectedFee(id);
  };

  const handleAdd = (data) => {
    addFee(data)
      .unwrap()
      .then((response) => toast.success(response.message))
      .finally(setIsOpenAdd(false));
  };
  const handleUpdate = (data) => {
    data._id = selectedFee;
    updateFee(data)
      .unwrap()
      .then((response) => toast.success(response.message))
      .finally(setIsOpenUpdate(false));
  };
  const handleDelete = () => {
    deleteFee(selectedFee)
      .unwrap()
      .then((response) => toast.success(response.message))
      .finally(setIsOpenDelete(false));
  };

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const filteredFee = feeList?.filter((fee) =>
    fee.name.toLowerCase().includes(search)
  );

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        !isError && (
          <div className="p-10 flex flex-col gap-4">
            <h1 className="font-bold text-2xl">
              Phí (<span>{feeList.length}</span>)
            </h1>
            <div className="flex flex-col md:flex-row justify-between ">
              <button
                onClick={handleOpenAdd}
                className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700"
              >
                Thêm phí mới
              </button>

              <div className="relative">
                <FaSearch className="absolute left-2 top-[10px]" />
                <input
                  className="p-2 ps-8 text-sm text-gray-900 border border-gray-400 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  placeholder="Tên phí..."
                  onChange={handleSearch}
                />
              </div>
            </div>
            <table className="w-full table-auto text-left">
              <thead>
                <tr>
                  {tableHead.map((head) => (
                    <th
                      className="py-4 px-2 border-b border-b-gray-400"
                      key={head}
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredFee.map((fee) => (
                  <tr key={fee._id} className="border-b border-b-gray-400">
                    <td className="px-2 py-4">{fee.name}</td>
                    <td className="px-2 py-4">
                      {fee.baseFee.toLocaleString()}
                    </td>
                    <td className="px-2 py-4">
                      {fee.mealFee.toLocaleString()}
                    </td>
                    <td className="px-2 py-4">
                      {fee.transportFee.toLocaleString()}
                    </td>
                    <td className="px-2 py-4">
                      {format(fee.dueDate, "dd/MM/yyyy")}
                    </td>
                    <td className="flex gap-2 px-2 py-4 item-center ">
                      <FaPencilAlt onClick={() => handleOpenUpdate(fee._id)} className="text-lg hover:text-red-800 cursor-pointer" />
                      <RiDeleteBin6Line
                        onClick={() => handleOpenDelete(fee._id)}
                        className="text-lg hover:text-red-800 cursor-pointer"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
      {/* Add modal */}
      <Dialog open={isOpenAdd} handler={handleOpenAdd}>
        <DialogHeader>Thêm phí mới</DialogHeader>
        <DialogBody>
          <form onSubmit={handleSubmit(handleAdd)}>
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Tên</label>
              <input
                {...register("name")}
                required
                type="text"
                name="name"
                id="name"
                className="border border-gray-500 rounded-lg p-2"
              />
              <label htmlFor="baseFee">Phí cơ bản</label>
              <input
                {...register("baseFee")}
                required
                type="text"
                name="baseFee"
                id="baseFee"
                className="border border-gray-500 rounded-lg  p-2"
              />
              <label htmlFor="mealFee">Phí ăn uống</label>
              <input
                {...register("mealFee")}
                required
                type="text"
                name="mealFee"
                id="mealFee"
                className="border border-gray-500 rounded-lg p-2"
              />
              <label htmlFor="transportFee">Phí phương tiện</label>
              <input
                {...register("transportFee")}
                required
                type="text"
                name="transportFee"
                id="transportFee"
                className="border border-gray-500 rounded-lg p-2"
              />
              <label htmlFor="dueDate">Ngày hết hạn</label>
              <input
                {...register("dueDate")}
                required
                type="date"
                name="dueDate"
                id="dueDate"
                className="border border-gray-500 rounded-lg p-2"
              />
              <button
                type="submit"
                className="bg-red-500 text-white hover:bg-red-600 rounded-lg p-2"
              >
                Lưu
              </button>
            </div>
          </form>
        </DialogBody>
      </Dialog>
      {/* Update modal */}
      <Dialog open={isOpenUpdate} handler={handleOpenUpdate}>
        <DialogHeader>Chỉnh sửa phí</DialogHeader>
        <DialogBody>
          <form onSubmit={handleSubmit(handleUpdate)}>
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Tên</label>
              <input
                {...register("name")}
                required
                type="text"
                name="name"
                id="name"
                className="border border-gray-500 rounded-lg p-2"
              />
              <label htmlFor="baseFee">Phí cơ bản</label>
              <input
                {...register("baseFee")}
                required
                type="text"
                name="baseFee"
                id="baseFee"
                className="border border-gray-500 rounded-lg  p-2"
              />
              <label htmlFor="mealFee">Phí ăn uống</label>
              <input
                {...register("mealFee")}
                required
                type="text"
                name="mealFee"
                id="mealFee"
                className="border border-gray-500 rounded-lg p-2"
              />
              <label htmlFor="transportFee">Phí phương tiện</label>
              <input
                {...register("transportFee")}
                required
                type="text"
                name="transportFee"
                id="transportFee"
                className="border border-gray-500 rounded-lg p-2"
              />
              <label htmlFor="dueDate">Ngày hết hạn</label>
              <input
                {...register("dueDate")}
                required
                type="date"
                name="dueDate"
                id="dueDate"
                className="border border-gray-500 rounded-lg p-2"
              />
              <button
                type="submit"
                className="bg-red-500 text-white hover:bg-red-600 rounded-lg p-2"
              >
                Lưu
              </button>
            </div>
          </form>
        </DialogBody>
      </Dialog>
      {/* Delete modal */}
      <Dialog open={isOpenDelete} handler={handleOpenDelete}>
        <DialogHeader>Xác nhận xoá chứ? 😢</DialogHeader>
        <DialogBody>Một khi đã xoá thì không thể hoàn tác lại</DialogBody>
        <DialogFooter>
          <button
            onClick={() => handleOpenDelete("")}
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
    </>
  );
}
