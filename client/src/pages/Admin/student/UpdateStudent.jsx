import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

import { useGetSclassListQuery } from "../../../redux/sclassRelated/sclassApiSlice";
import { useGetParentListQuery } from "../../../redux/parentRelated/parentApiSlice";
import { uploadFile } from "../../../helpers/uploadFile";
import {
  useEditStudentMutation,
  useGetStudentDetailsQuery,
} from "../../../redux/studentRelated/studentApiSlice";

const UpdateStudent = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { id } = useParams();

  const { data: studentDetails, isLoading: isLoadStudentDetails } =
    useGetStudentDetailsQuery(id);
  const { data: sclassList } = useGetSclassListQuery();
  const { data: parentList } = useGetParentListQuery();
  const [editStudent, { isLoading }] = useEditStudentMutation();

  const [avartarUrl, setAvatarUrl] = useState("");

  if (!isLoadStudentDetails && studentDetails) {
    setValue("name", studentDetails.name);
    setValue("student_id", studentDetails.student_id);
    setValue("class_id", studentDetails.class_id._id);
    setValue("dob", studentDetails.dob);
    setValue("gender", studentDetails.gender);
    setValue("address", studentDetails.address);
    setValue("user_id", studentDetails.user_id._id);
  }

  const uploadAvatar = async (e) => {
    await uploadFile(e.target.files[0]).then((response) =>
      setAvatarUrl(response.url)
    );
  };

  const saveStudent = async (data) => {
    data._id = studentDetails._id;
    data.avatar = avartarUrl;
    await editStudent(data)
      .unwrap()
      .then((response) => {
        toast.success(response.message);
        navigate("/admin/students");
      });
  };

  useEffect(() => {
    setAvatarUrl(studentDetails?.avatar);
  }, [studentDetails]);

  return (
    <>
      <div className="flex flex-col gap-6 p-10">
        <h1 className="font-bold text-2xl">Chỉnh sửa học sinh</h1>
        <form
          onSubmit={handleSubmit(saveStudent)}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Họ và tên</label>
            <input
              {...register("name", {
                required: { value: true, message: "Chưa nhập tên" },
              })}
              name="name"
              id="name"
              type="text"
              className="p-2 rounded-lg border border-gray-400"
            />
            {errors.name && (
              <p className="text-sm text-red-700">{errors.name.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="student_id">Mã định danh</label>
            <input
              {...register("student_id", {
                required: { value: true, message: "Chưa nhập mã định danh" },
                maxLength: {
                  value: 12,
                  message: "Mã định danh có tối đa 12 kí tự",
                },
              })}
              name="student_id"
              id="student_id"
              type="number"
              className="p-2 rounded-lg border border-gray-400"
            />
            {errors.student_id && (
              <p className="text-sm text-red-700">
                {errors.student_id.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="dob">Ngày sinh</label>
            <input
              {...register("dob", {
                required: { value: true, message: "Chưa nhập ngày sinh" },
              })}
              name="dob"
              id="dob"
              type="date"
              className="p-2 rounded-lg border border-gray-400"
            />
            {errors.dob && (
              <p className="text-sm text-red-700">{errors.dob.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="gender">Giới tính</label>
            <select
              {...register("gender")}
              id="gender"
              name="gender"
              className="p-2 rounded-lg border border-gray-400"
            >
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="address">Địa chỉ</label>
            <input
              {...register("address", {
                required: { value: true, message: "Chưa nhập địa chỉ" },
              })}
              className="p-2 rounded-lg border border-gray-400"
              name="address"
              id="address"
              type="text"
            />
            {errors.address && (
              <p className="text-sm text-red-700">{errors.address.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="user_id">Chọn tài khoản phụ huynh quản lý</label>
            <select
              id="user_id"
              name="user_id"
              {...register("user_id")}
              className="p-2 rounded-lg border border-gray-400"
            >
              {parentList?.map((parent) => (
                <option key={parent._id} value={parent._id}>
                  {parent.username}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="class_id">Chọn lớp</label>
            <select
              name="class_id"
              id="class_id"
              {...register("class_id")}
              className="p-2 rounded-lg border border-gray-400"
            >
              {sclassList?.map((sclass) => (
                <option key={sclass._id} value={sclass._id}>
                  {sclass.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            {avartarUrl && (
              <img
                className="size-32 border border-black rounded-full mb-6"
                src={avartarUrl}
              />
            )}
            <input
              onChange={uploadAvatar}
              type="file"
              className="p-2 rounded-lg border border-gray-400"
            />
          </div>
          <div className="flex justify-end gap-4 ">
            <Link to="/admin/students">
              <button
                className="hover:bg-gray-300 rounded-md p-2"
                type="button"
              >
                Huỷ bỏ
              </button>
            </Link>
            <button
              disabled={isLoading}
              className="bg-gray-600 p-2 rounded-md hover:bg-gray-700 text-white"
              type="submit"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateStudent;
