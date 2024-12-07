import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

import { useGetSclassListQuery } from "../../../redux/sclassRelated/sclassApiSlice";
import { uploadFile } from "../../../helpers/uploadFile";
import { useAddTeacherMutation } from "../../../redux/teacherRelated/teacherApiSlice";
import { useGetGroupActivityQuery } from "../../../redux/activityRelated/activityApiSlice";

const AddTeacher = () => {
  const navigate = useNavigate();
  const [avartarUrl, setAvatarUrl] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { data: sclassList } = useGetSclassListQuery();
  const { data: groupActivity } = useGetGroupActivityQuery();
  const [addTeacher, { isLoading }] = useAddTeacherMutation();


  const uploadAvatar = async (e) => {
    await uploadFile(e.target.files[0]).then((response) =>
      setAvatarUrl(response.url)
    );
  };

  const saveTeacher = async (data) => {
    data.profile = avartarUrl;
    await addTeacher(data)
      .unwrap()
      .then((response) => {
        toast.success(response.message);
        navigate("/admin/teachers")
      });
  };

  return (
    <>
      <div className="flex flex-col gap-6 p-10">
        <h1 className="font-bold text-2xl">Thêm giáo viên</h1>
        <form
          onSubmit={handleSubmit(saveTeacher)}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="username">Tên đăng nhập</label>
            <input
              {...register("username", {
                required: { value: true, message: "Chưa nhập tên đăng nhập" },
              })}
              name="username"
              id="username"
              type="text"
              className="p-2 rounded-lg border border-gray-400"
            />
            {errors.username && (
              <p className="text-sm text-red-700">{errors.username.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Mật khẩu</label>
            <input
              {...register("password", {
                required: { value: true, message: "Chưa nhập mật khẩu" }
              })}
              name="password"
              id="password"
              type="password"
              className="p-2 rounded-lg border border-gray-400"
            />
            {errors.password && (
              <p className="text-sm text-red-700">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Họ và tên</label>
            <input
              {...register("name", {
                required: { value: true, message: "Chưa nhập họ và tên" },
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
            <label htmlFor="gender">Giới tính</label>
            <select
              id="gender"
              name="gender"
              {...register("gender")}
              className="p-2 rounded-lg border border-gray-400"
            >
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="age">Tuổi</label>
            <input
              {...register("age", {
                required: { value: true, message: "Chưa nhập tuổi" },
              })}
              className="p-2 rounded-lg border border-gray-400"
              name="age"
              id="age"
              type="number"
            />
            {errors.age && (
              <p className="text-sm text-red-700">{errors.age.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="phone">Số điện thoại</label>
            <input
              {...register("phone", {
                required: { value: true, message: "Chưa nhập số điện thoại" },
              })}
              className="p-2 rounded-lg border border-gray-400"
              name="phone"
              id="phone"
              type="number"
            />
            {errors.phone && (
              <p className="text-sm text-red-700">{errors.phone.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              {...register("email", {
                required: { value: true, message: "Chưa nhập email" },
              })}
              className="p-2 rounded-lg border border-gray-400"
              name="email"
              id="email"
              type="email"
            />
            {errors.email && (
              <p className="text-sm text-red-700">{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="class_id">Chọn lớp chủ nhiệm</label>
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
          <div className="flex flex-col gap-2">
            <label htmlFor="activityAssign">Chọn hoạt động</label>
            <select
              id="activityAssign"
              name="activityAssign"
              {...register("activityAssign")}
              className="p-2 rounded-lg border border-gray-400"
            >
              <option value=""></option>
              {groupActivity?.map(groupAct => <option key={groupAct._id} value={groupAct._id}>{groupAct.group_activity}</option>)}
            </select>
          </div>
          <div>
            <label className="block" htmlFor="profile">Ảnh đại diện</label>
            {avartarUrl && (
              <img
                id="profile"
                className="size-32 border border-black rounded-full mb-6"
                src={avartarUrl}
              />
            )}
            <input
              onChange={uploadAvatar}
              type="file"
              required
              className="p-2 rounded-lg border border-gray-400"
            />
          </div>
          <div className="flex justify-end gap-4 ">
            <Link to="/admin/teachers">
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

export default AddTeacher;
