import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTeacherList } from '../../redux/teacherRelated/teacherHandle'
import { getStudentList } from '../../redux/studentRelated/studentHandle'
import { getClassList } from '../../redux/sclassRelated/sclassHandle'
import { getNoticeList } from '../../redux/noticeRelated/noticeHandle'
import RecordTable from '../component/RecordTable'

function AdminHomepage() {
  const dispatch = useDispatch()
  const { teacherList } = useSelector((state) => state.teacher)
  const { classList } = useSelector((state) => state.sclass)
  const { studentList } = useSelector((state) => state.student)
  const { noticeList } = useSelector((state) => state.notice)


  const { currentUser } = useSelector((state) => state.user)

  const numberOfTeacher = teacherList && teacherList.length;
  const numberOfClass = classList && classList.length
  const numberOfStudent = studentList && studentList.length


  useEffect(() => {
    dispatch(getTeacherList())
    dispatch(getStudentList())
    dispatch(getClassList())
    dispatch(getNoticeList())
  }, [currentUser._id])

  return <>
    <div className='flex flex-col flex-1 p-14 gap-7'>
      {/* Container render total */}
      <div className="p-2 flex flex-col lg:flex-row justify-evenly items-center">
        <div className="flex flex-col items-center justify-center gap-2 shadow-lg border p-2 min-w-56 min-h-40">
          <p>Số lượng học sinh</p>
          <p>{numberOfStudent.length == 0 ? 0 : numberOfStudent}</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 shadow-lg p-2 min-w-56 min-h-40">
          <p>Số lượng giáo viên</p>
          <p>{numberOfTeacher.length == 0 ? 0 : numberOfTeacher}</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 shadow-lg p-2 min-w-56 min-h-40">
          <p>Số lượng lớp</p>
          <p>{numberOfClass.length == 0 ? 0 : numberOfClass}</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 shadow-lg p-2 min-w-56 min-h-40">
          <p>Số lượng phụ huynh</p>
          <p>0</p>
        </div>
      </div>

      {/* Container render notices */}
      <div>
        <table className="table-auto border-collapse w-full">
          <thead>
            <tr>
              <th className="border border-slate-300 w-9/12">Tiêu đề</th>
              <th className="border border-slate-300">Ngày tạo</th>
              <th className="border border-slate-300">Hành động</th>
            </tr>
          </thead>
          <tbody>
              <RecordTable  data={noticeList}/>
          </tbody>
        </table>
      </div>
    </div>
  </>

}

export default AdminHomepage