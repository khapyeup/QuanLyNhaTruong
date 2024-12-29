import { Button } from "@material-tailwind/react";
import React from "react";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import { useDeleteActivityMutation } from "../../../redux/activityRelated/activityApiSlice";

const DeleteActivityModal = ({ onClose, activity, group }) => {
  const [deleteActivity, { isLoading: isDeleting }] =
    useDeleteActivityMutation();

  const handleDelete = () => {
    deleteActivity({ id: group._id, activityId: activity._id }).unwrap().then((res) => {toast.success(res.message); onClose()});
    
  };
  if (isDeleting) return <p className="inset-0 bg-gray-500 opacity-25">Đang xóa...</p>;
  return (
    <div
      className="inset-0 fixed flex justify-center items-center bg-black/20"
      onClick={onClose}
    >
      <div
        className="opacity-100 bg-white w-1/4 px-2 py-3 rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-5">
          Bạn có chắc chắn muốn xóa không?
          <IoMdClose
            onClick={onClose}
            className="cursor-pointer text-2xl text-red-500 hover:text-black"
          />
        </div>

        <Button  onClick={handleDelete} className="bg-red-700 mt-5">
          Ok
        </Button>
        <Button onClick={onClose} className="bg-gray-800 mt-5">
          Không
        </Button>
      </div>
    </div>
  );
};

export default DeleteActivityModal;
