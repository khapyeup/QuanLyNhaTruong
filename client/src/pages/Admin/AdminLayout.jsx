import "react-toastify/dist/ReactToastify.css";

import AdminSidebar from "./AdminSidebar";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminHomepage from "./AdminHomepage";
import ShowStudent from "./student/ShowStudent";
import ShowClasses from "./classes/ShowClasses";
import ShowNotice from "./notice/ShowNotice";

import AddStudent from "./student/AddStudent";
import StudentDetails from "./student/StudentDetails";
import UpdateStudent from "./student/UpdateStudent";
import { useDispatch } from "react-redux";

import ShowTeacher from "./teacher/ShowTeacher";
import AddTeacher from "./teacher/AddTeacher";
import TeacherDetails from "./teacher/TeacherDetails";
import AddNotice from "./notice/AddNotice";
import NoticeDetails from "./notice/NoticeDetails";

import TimeTable from "./timetable/TimeTable";
import AddClass from "./classes/AddClass";
import UserList from "./user/UserList";
import AddUser from "./user/AddUser";
import EditUser from "./user/EditUser";
import ShowGroupActivity from "./activity/ShowGroupActivity";
import DetailUser from "./user/DetailUser";
// icon
import { IoIosLogOut } from "react-icons/io";
//Menudropdown
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { authLogout } from "../../redux/userRelated/userSlice";
import UpdateTeacher from "./teacher/UpdateTeacher";
import UpdateNotice from "./notice/UpdateNotice";
import AddProgressRecord from "../component/Progress/AddProgressRecord";
import UpdateProgressRecord from "../component/Progress/updateProgressRecord";
import FeeList from "./fee/FeeList";
import PaymentList from "./payment/PaymentList";
import PaymentAssign from "./payment/PaymentAssign";
import PaymentDetail from "./payment/PaymentDetail";
import ComplaintList from "./complaint/ComplaintList";

function AdminLayout() {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(authLogout());
  };

  return (
    <>
      <div className="h-screen flex">
        {/* Sidebar */}
        <div className=" md:w-[8%] lg:w-[14%] p-4">
          <p className="hidden lg:block mb-4 font-bold">Quản lý nhà trường</p>
          <AdminSidebar />
        </div>

        {/* Navbar */}
        <div className="w-full md:w-[92%] lg:w-[86%] bg-[#F7F8FA] overflow-y-scroll">
          <div className="flex flex-row justify-end w-full px-6  py-1 items-center bg-white border-y-2">
            <Menu>
              <MenuHandler>
                <img
                  src="/admin.png"
                  className="cursor-pointer rounded-full border border-black size-12"
                />
              </MenuHandler>
              <MenuList>
                <MenuItem className="flex items-center gap-2" onClick={logout}>
                  <IoIosLogOut /> Đăng xuất
                </MenuItem>
              </MenuList>
            </Menu>
          </div>

          <Routes>
            <Route path="/" element={<AdminHomepage />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="admin/dashboard" element={<AdminHomepage />} />

            {/* Teacher route */}
            <Route path="/Admin/teachers/" element={<ShowTeacher />} />
            <Route path="admin/teachers/add" element={<AddTeacher />} />
            <Route
              path="/admin/teachers/view/:id"
              element={<TeacherDetails />}
            />
            <Route
              path="/admin/teachers/edit/:id"
              element={<UpdateTeacher />}
            />
            {/* Student route */}
            <Route path="/admin/students/" element={<ShowStudent />} />
            <Route path="/admin/students/add" element={<AddStudent />} />
            <Route
              path="/admin/students/view/:id"
              element={<StudentDetails />}
            />
            <Route
              path="/admin/students/view/:id/record/add"
              element={<AddProgressRecord />}
            />
            <Route
              path="/admin/students/view/:id/record/:recordId/update"
              element={<UpdateProgressRecord />}
            />
            <Route
              path="/admin/students/edit/:id"
              element={<UpdateStudent />}
            />
            {/* FeeStruture route */}
            <Route path="/admin/fees" element={<FeeList />} />
            {/* Payment route */}
            <Route path="/admin/payments" element={<PaymentList />} />
            <Route
              path="/admin/payments/:studentId"
              element={<PaymentDetail />}
            />
            <Route
              path="/admin/payments/assigntostudent"
              element={<PaymentAssign />}
            />

            {/* Activity route */}
            <Route path="/admin/activities/" element={<ShowGroupActivity />} />

            {/* Classes route */}
            <Route path="/admin/classes/" element={<ShowClasses />} />
            <Route path="/admin/classes/add" element={<AddClass />} />

            {/* Notice router */}
            <Route path="/admin/notices/" element={<ShowNotice />} />
            <Route path="admin/notices/add" element={<AddNotice />} />
            <Route path="/admin/notices/view/:id" element={<NoticeDetails />} />
            <Route path="/admin/notices/edit/:id" element={<UpdateNotice />} />

            {/* Timetable route */}
            <Route path="admin/timetable/" element={<TimeTable />} />

            {/* User route */}
            <Route path="admin/user/" element={<UserList />} />
            <Route path="admin/user/view/:id" element={<DetailUser />} />
            <Route path="admin/user/add" element={<AddUser />} />
            <Route path="admin/user/:id" element={<EditUser />} />

            {/* Complaint route */}
            <Route path="admin/complaints" element={<ComplaintList/>}/>
          </Routes>
        </div>
      </div>
    </>
  );
}

export default AdminLayout;
