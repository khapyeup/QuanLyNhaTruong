import { useSelector } from 'react-redux'
import { useGetStudentByParentQuery } from "../../redux/studentRelated/studentApiSlice"
import { useGetTeacherListQuery } from "../../redux/teacherRelated/teacherApiSlice"
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiStudent } from "react-icons/pi";
import Loading from '../component/Loading';



const ParentHomepage = () => {


  const { currentUser } = useSelector(state => state.user)

  const { data: studentList, isLoading } = useGetStudentByParentQuery(currentUser._id);
  const { data: teacherList } = useGetTeacherListQuery();

if (isLoading) return <Loading size={12} />

  return (

    <div className='flex flex-col gap-10 p-10'>
      <h1 className='font-bold text-xl'>Xin chào, {currentUser.username}</h1>
      <div className='grid md:grid-cols-2 gap-4'>
        <div className="text-white rounded-lg  bg-red-400 flex flex-col items-center justify-center gap-2 shadow-lg border p-2 min-w-56 min-h-40   ">
          <PiStudent className="size-20" />
          <p>Số lượng học sinh</p>
          <i className="fa fa-heart"></i>
          <p>{studentList?.length}</p>
        </div>
        <div className="text-white rounded-lg bg-amber-700 flex flex-col items-center justify-center gap-2 shadow-lg p-2 min-w-56 min-h-40  ">
          <FaChalkboardTeacher className="text-white size-20" />
          <p>Số lượng giáo viên</p>
          <p>{teacherList?.length}</p>
        </div>
      </div>

      <div className='grid md:grid-cols-2 gap-4'>
        <div className='p-4 border border-gray-300 shadow rounded-lg flex flex-col gap-4'>
          <h2 className='font-bold text-xl'>Thông tin tài khoản</h2>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-row justify-between'><p className='font-bold flex'>Tên tài khoản</p>  <span>{currentUser.username}</span></div>
            <div className='flex flex-row justify-between'><p className='font-bold'>Email cha</p> <span >{currentUser.parentInfo.fatherEmail}</span></div>
            <div className='flex flex-row justify-between'><p className='font-bold'>Số điện thoại cha </p> <span >{currentUser.parentInfo.fatherPhone}</span></div>


          </div>

        </div>
        {/* <div className='p-4 border border-gray-400 rounded-lg flex flex-col gap-4'>
          <h2 className='font-bold text-xl'>Thông báo</h2>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-row justify-between'><p className='font-bold flex'>Tên tài khoản</p>  <span>{currentUser.username}</span></div>
            <div className='flex flex-row justify-between'><p className='font-bold'>Email cha</p> <span >{currentUser.parentInfo.fatherEmail}</span></div>
            <div className='flex flex-row justify-between'><p className='font-bold'>Số điện thoại cha </p> <span >{currentUser.parentInfo.fatherPhone}</span></div>


          </div>

        </div> */}
      </div>


    </div>

  )
}


export default ParentHomepage