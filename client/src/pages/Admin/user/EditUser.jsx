import { Input, Button } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { useEditParentMutation, useGetParentDetailsQuery } from "../../../redux/parentRelated/parentApiSlice";
import Loading from "../../component/Loading";
import { toast } from "react-toastify";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: parent, isLoading, error } = useGetParentDetailsQuery(id);
  const [editParent, { isLoading: isEditing }] = useEditParentMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    editParent(data)
      .unwrap()
      .then((res) => toast.success(res.message))
      .finally(() => navigate("/admin/user/"));
  };

  if (error) {
    return <p>Đã có lỗi xảy ra</p>;
  }

  // Reset form when parent data is loaded
  useEffect(() => {
    if (parent) {
      reset(parent);
    }
  }, [parent, reset]);

  return (
    <>
      {isLoading ? (
        <Loading size={12} />
      ) : (
        <div className="w-1/3 p-3 mx-auto my-6">
          <h1 className="font-bold">Chỉnh sửa tài khoản</h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2 md:gap-4 mt-5">
              <div className="border p-3 rounded-xl flex flex-col gap-2 md:gap-4 mt-5">
                <Input
                  type="text"
                  label="Tên đăng nhập"
                  {...register("username", { required: true })}
                  name="username"
                />
                {errors.username?.type === "required" && (
                  <p className="text-red-800">Cần nhập tên đăng nhập</p>
                )}

                <Input
                  type="password"
                  label="Mật khẩu"
                  {...register("password", { required: true })}
                  name="password"
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-800">Cần nhập mật khẩu</p>
                )}
              </div>

              <div className="border p-3 rounded-xl flex flex-col gap-2 md:gap-4 mt-5">
                <h1>Thông tin cha</h1>

                <Input
                  type="text"
                  label="Tên cha"
                  {...register("parentInfo.fatherName", { required: true })}
                  name="parentInfo.fatherName"
                />
                <Input
                  type="number"
                  label="Tuổi"
                  {...register("parentInfo.fatherAge", { required: true })}
                  name="parentInfo.fatherAge"
                />
                <Input
                  type="text"
                  label="Email"
                  {...register("parentInfo.fatherEmail", { required: true })}
                  name="parentInfo.fatherEmail"
                />
                <Input
                  type="text"
                  label="Điện thoại"
                  {...register("parentInfo.fatherPhone", { required: true })}
                  name="parentInfo.fatherPhone"
                />
                <Input
                  type="text"
                  label="CCCD"
                  {...register("parentInfo.fatherPassport", { required: true })}
                  name="parentInfo.fatherPassport"
                />
              </div>

              <div className="border p-3 rounded-xl flex flex-col gap-2 md:gap-4 mt-5">
                <h1>Thông tin mẹ</h1>
                <Input
                  type="text"
                  label="Tên mẹ"
                  {...register("parentInfo.motherName", { required: true })}
                  name="parentInfo.motherName"
                />
                <Input
                  type="number"
                  label="Tuổi"
                  {...register("parentInfo.motherAge", { required: true })}
                  name="parentInfo.motherAge"
                />
                <Input
                  type="text"
                  label="Email"
                  {...register("parentInfo.motherEmail", { required: true })}
                  name="parentInfo.motherEmail"
                />
                <Input
                  type="text"
                  label="Điện thoại"
                  {...register("parentInfo.motherPhone", { required: true })}
                  name="parentInfo.motherPhone"
                />
                <Input
                  type="text"
                  label="CCCD"
                  {...register("parentInfo.motherPassport", { required: true })}
                  name="parentInfo.motherPassport"
                />
              </div>

              <div className="flex justify-between flex-col lg:flex-row gap-2 ">
                <Button disabled={isLoading} type="submit">
                  Cập nhật
                </Button>
                <Link to={"/admin/user"}>
                  <Button className="bg-red-600 w-full">Hủy bỏ</Button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default EditUser;
