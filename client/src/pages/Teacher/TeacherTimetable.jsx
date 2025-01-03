import { useForm } from "react-hook-form";
import BigCalendar from "../component/BigCalendar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClassList } from "../../redux/sclassRelated/sclassHandle";
import Loading from "../component/Loading.jsx";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format, formatDate, startOfWeek } from "date-fns";
import { Axios } from "axios";

function TeacherTimetable() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const { classList, loading, response } = useSelector((state) => state.sclass);
  const [schedule, setSchedule] = useState(null);

  const submit = async (data) => {
    const startWeek = format(
      startOfWeek(data.date, { weekStartsOn: 1 }),
      "yyyy/MM/dd"
    );

    const filter = classList
      .find((sclass) => sclass._id === data.classId)
      .schedule.find((item) => item.weekStart.includes(startWeek));

    setSchedule(filter);
  };

  useEffect(() => {
    dispatch(getClassList());
  }, [dispatch]);

  useEffect(() => {
    if (response?.message)
      toast.error(response?.message || "Có lỗi khi load dữ liệu");
  }, [response]);
  return (
    <div className="flex flex-col sm:flex-row gap-5 h-[calc(100vh-48px)]">
      
      {/* Ben trai */}
      {loading ? (
        <Loading size={12} />
      ) : (
        <form
          className="flex flex-col sm:w-1/4 gap-5 border-r-2 h-full p-3"
          onSubmit={handleSubmit(submit)}
        >
          <div className="flex flex-col">
            <label htmlFor="classId" className="text-center font-bold">
              Chọn lớp
            </label>
            <select
              {...register("classId")}
              name="classId"
              id="classId"
              className="py-2 px-4 border border-gray-400 rounded-lg"
            >
              <option></option>
              {classList?.map((sclass) => (
                <option key={sclass._id} value={sclass._id}>
                  {sclass.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="date" className="text-center font-bold">
              Chọn tuần
            </label>
            <input
              {...register("date")}
              name="date"
              id="date"
              className="py-2 px-4 rounded-lg border border-gray-400"
              type="date"
              defaultValue={formatDate(new Date(), "yyyy-MM-dd")}
            />
          </div>
          <button
            type="submit"
            className="px-1 py-2 border-green-400 border text-green-400 hover:bg-green-400 hover:text-white rounded-lg"
          >
            Tải thời khoá biểu
          </button>
        </form>
      )}

      {/* Ben phai */}
      <div className="w-full">
        <BigCalendar timetable={schedule}/>
        
      </div>
    </div>
  );
}

export default TeacherTimetable;
