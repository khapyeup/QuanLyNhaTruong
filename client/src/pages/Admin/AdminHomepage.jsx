import { format } from "date-fns";
import { Link } from "react-router-dom";
//Icon
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiStudent } from "react-icons/pi";
import { MdOutlineClass } from "react-icons/md";
import { RiParentLine } from "react-icons/ri";
//Api slice
import { useGetTeacherListQuery } from "../../redux/teacherRelated/teacherApiSlice";
import { useGetStudentListQuery } from "../../redux/studentRelated/studentApiSlice";
import { useGetNoticeListQuery } from "../../redux/noticeRelated/noticeApiSlice";
import { useGetParentListQuery } from "../../redux/parentRelated/parentApiSlice";
import { useGetSclassListQuery } from "../../redux/sclassRelated/sclassApiSlice";
import { useSelector } from "react-redux";
import Loading from '../component/Loading'

function AdminHomepage() {
  const {currentUser} = useSelector(state => state.user)

  const { data: teacherList = [] } = useGetTeacherListQuery();
  const { data: studentList = [], isLoading: isStudentLoading} = useGetStudentListQuery();
  const { data: sclassList = []} = useGetSclassListQuery();
  const { data: noticeList = []} = useGetNoticeListQuery();
  const { data: parentList = []} = useGetParentListQuery();

  const numberOfTeacher =  teacherList.length ;
  const numberOfClass =  sclassList.length ;
  const numberOfStudent =  studentList.length ;
  const numberOfParent = parentList.length ;

  if (isStudentLoading) return <Loading size={12}/>
  return (
    <>
      <div className="flex flex-col flex-1 p-14 gap-7 ">
        <p>Xin chào, {currentUser.username}</p>
        {/* Container render total */}
        <div className=" p-2 gap-y-7 flex flex-row justify-evenly items-center flex-wrap">
          <div className="text-white rounded-lg  bg-red-400 flex flex-col items-center justify-center gap-2 shadow-lg border p-2 min-w-56 min-h-40   ">
            <PiStudent className="size-20" />
            <p>Số lượng học sinh</p>
            <i className="fa fa-heart"></i>
            <p>{numberOfStudent}</p>
          </div>
          <div className="text-white rounded-lg bg-amber-700 flex flex-col items-center justify-center gap-2 shadow-lg p-2 min-w-56 min-h-40  ">
            <FaChalkboardTeacher className="text-white size-20" />
            <p>Số lượng giáo viên</p>
            <p>{numberOfTeacher}</p>
          </div>
          <div className="text-white rounded-lg bg-lime-800 flex flex-col items-center justify-center gap-2 shadow-lg p-2 min-w-56 min-h-40   ">
            <MdOutlineClass className="text-white size-20" />
            <p>Số lượng lớp</p>
            <p>{numberOfClass}</p>
          </div>
          <div className="text-white rounded-lg bg-deep-orange-900 flex flex-col items-center justify-center gap-2 shadow-lg p-2 min-w-56 min-h-40  ">
            <RiParentLine className="text-white size-20" />

            <p>Số lượng phụ huynh</p>
            <p>{numberOfParent}</p>
          </div>
        </div>

        {/* Container render notices */}
        <div>
          <div className="flex flex-row justify-between">
            <h1 className="font-bold text-xl">Thông báo</h1>
            <Link className="font-bold" to="/admin/notices">Xem tất cả</Link>
          </div>

          <ul>
            {noticeList?.map((notice) => (
              <li key={notice._id} className="flex flex-wrap justify-between py-4 cursor-default hover:bg-gray-200 rounded-md">
                <p>{notice.title}</p>
                <p>{format(notice.date, "dd/MM/yyyy")}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default AdminHomepage;
