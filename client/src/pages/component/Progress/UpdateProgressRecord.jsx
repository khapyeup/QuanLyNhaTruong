import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Loading from "../Loading";
import { useForm } from "react-hook-form";
import { uploadFile } from "../../../helpers/uploadFile";
import {
  useGetProgressRecordDetailQuery,
  useUpdateProgressRecordMutation,
} from "../../../redux/progressRelated/progressApiSlice";
//Icon
import { AiFillCloseCircle } from "react-icons/ai";
import { toast } from "react-toastify";

const UpdateProgressRecord = () => {
  const { recordId, id } = useParams();
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  
  const { data: record, isLoading } = useGetProgressRecordDetailQuery(recordId);
  const [updateRecord] = useUpdateProgressRecordMutation()
  
  const [evidence, setEvidence] = useState([]);
  
  const categories = [
    "Nhận thức",
    "Giao tiếp",
    "Cảm xúc",
    "Ngôn ngữ",
    "Thể chất",
  ];

  const deleteImage = (url) => {
    const temp = evidence.filter((data) => data.url !== url);
    setEvidence(temp);
    
  };
  const uploadImage = (e) => {
    uploadFile(e.target.files[0]).then((response) =>
      setEvidence([...evidence, { url: response.url }])
    );
  };

  const updateDescription = (index, e) => {
    setEvidence(
      evidence.map((item, i) =>
        i === index ? { ...item, description: e.target.value } : item
      )
    );
  };

  const editProgress = (data) => {
    data.id = recordId
    data.evidence = evidence;
    updateRecord(data)
      .unwrap()
      .then((response) => toast.success(response.message))
      .finally(() => navigate(`/admin/students/view/${id}`));
  };

  useEffect(() => {
    setValue("category", record?.category);
    setValue("observation", record?.observation);
    setValue("teacherNotes", record?.teacherNotes);
    setEvidence(record?.evidence);
  }, [record, isLoading]);
  console.log(evidence);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <form
          onSubmit={handleSubmit(editProgress)}
          className="p-6 flex flex-col gap-4 rounded-lg border shadow-md"
        >
          <h1 className="font-bold text-2xl">Chỉnh sửa bản theo dõi</h1>

          <select
            {...register("category", { required: "Chưa chọn danh mục" })}
            className="p-2 border border-gray-500 rounded-md"
          >
            <option value="">Chọn danh mục</option>
            {categories.map((category) => (
              <option value={category}>{category}</option>
            ))}
          </select>
          {errors?.category && (
            <p className="text-red-500">{errors.category.message}</p>
          )}
          <textarea
            {...register("observation", { required: "Chưa nhập mục này" })}
            placeholder="Quan sát"
            className="border border-gray-500 p-2 rounded-md"
          />
          {errors?.observation && (
            <p className="text-red-500">{errors.observation.message}</p>
          )}
          <label className="font-bold" htmlFor="image">
            Hình ảnh
          </label>
          <input
            onChange={uploadImage}
            id="image"
            accept="image/*"
            type="file"
          />
          <div className="flex flex-col gap-2">
            {evidence?.length !== 0 &&
              evidence?.map((data, index) => (
                <div className="relative my-2">
                  <AiFillCloseCircle
                    onClick={() => deleteImage(data.url)}
                    className=" absolute text-xl cursor-pointer"
                  />
                  <img src={data.url} className="size-32" />
                  <input
                    value={data.description}
                    onChange={(e) => updateDescription(index, e)}
                    className="w-full border border-gray-500 p-2 rounded-md mt-2"
                    placeholder="Mô tả về bức ảnh"
                  />
                </div>
              ))}
          </div>
          <textarea
            {...register("teacherNotes", { required: "Chưa nhập lời nhắn" })}
            placeholder="Lời nhắn giáo viên"
            className="border border-gray-500 p-2 rounded-md"
          />
          {errors?.teacherNotes && (
            <p className="text-red-500">{errors.teacherNotes.message}</p>
          )}
          <button className="border border-red-600 rounded-md p-2 hover:bg-red-600 hover:text-white">
            Lưu
          </button>
          <Link
            to={`/admin/students/view/${id}`}
            type="button"
            className="border text-center rounded-md p-2 bg-gray-400 hover:bg-gray-600 hover:text-white"
          >
            Quay lại
          </Link>
        </form>
      )}
    </>
  );
};

export default UpdateProgressRecord;
