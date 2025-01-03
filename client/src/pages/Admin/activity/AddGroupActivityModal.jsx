import { Button, Input } from "@material-tailwind/react";
import React from "react";
import { IoMdClose } from "react-icons/io";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addGroupActivity } from "../../../redux/activityRelated/activityHandle";
import { useAddGroupActivityMutation } from "../../../redux/activityRelated/activityApiSlice";
import { toast } from "react-toastify";

const AddGroupActivityModal = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [addGroupActivity, {isLoading: isAdding}] = useAddGroupActivityMutation();

  function submit(data) {
    addGroupActivity(data)
      .unwrap()
      .then((res) => {
        toast.success(res.message);
        onClose();
      });
  }
  return (
    <div className="inset-0 fixed flex justify-center items-center bg-black/20">
      <div
        className="bg-white opacity-100  p-4 rounded-lg w-full md:w-1/2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-5 font-bold">
          Thêm nhóm hoạt động mới
          <IoMdClose
            onClick={onClose}
            className="cursor-pointer text-2xl text-red-500 hover:text-black"
          />
        </div>

        <form onSubmit={handleSubmit(submit)}>
          <Input
            {...register("group_activity", { required: true, minLength: 5 })}
            name="group_activity"
            type="text"
            label="Tên nhóm hoạt động"
          />
          {errors.group_activity?.type === "required" && (
            <p>Chưa nhập tên nhóm hoạt động</p>
          )}
          {errors.group_activity?.type === "minLength" && (
            <p>Tối thiểu 5 kí tự</p>
          )}

          <Button disabled={isAdding} type="submit" className="bg-red-700 mt-5">
            Ok
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddGroupActivityModal;
