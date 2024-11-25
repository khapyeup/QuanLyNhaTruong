import { Link, useNavigate, useParams } from "react-router-dom";

import { useForm } from "react-hook-form";
import { useEditNoticeMutation, useGetNoticeDetailsQuery } from "../../../redux/noticeRelated/noticeApiSlice";
import { toast } from "react-toastify";

const UpdateNotice = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const {id} = useParams();
  const {data: noticeDetails, isLoading: isLoadingNotice} = useGetNoticeDetailsQuery(id)
  const [editNotice, { isLoading }] = useEditNoticeMutation();

  if (!isLoadingNotice && noticeDetails)
  {
    setValue("title",noticeDetails.title)
    setValue("content", noticeDetails.content)
  }

  const saveNotice = async (data) => {
    data._id = id;
    await editNotice(data)
      .unwrap()
      .then((response) => toast.success(response.message))
      .finally(navigate("/admin/notices"));
  };

  return (
    <>
      <div className="flex flex-col gap-6 p-10">
        <h1 className="font-bold text-2xl">Chỉnh sửa thông báo</h1>
        <form
          onSubmit={handleSubmit(saveNotice)}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="title">Tiêu đề</label>
            <input
              {...register("title", {
                required: { value: true, message: "Chưa nhập tiêu đề" },
              })}
              name="title"
              id="title"
              type="text"
              className="p-2 rounded-lg border border-gray-400"
            />
            {errors.title && (
              <p className="text-sm text-red-700">{errors.title.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="content">Nội dung</label>
            <textarea
              {...register("content", {
                required: { value: true, message: "Chưa nhập nội dung" },
              })}
              name="content"
              id="content"
              className="p-2 rounded-lg border border-gray-400"
            />
            {errors.content && (
              <p className="text-sm text-red-700">{errors.content.message}</p>
            )}
          </div>
          <div className="flex justify-end gap-4 ">
            <Link to="/admin/notices">
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

export default UpdateNotice;
