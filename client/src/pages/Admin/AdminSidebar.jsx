import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import {
    Card,
    Typography,
    List,
    Button
} from "@material-tailwind/react";
import { TfiDashboard } from "react-icons/tfi";
import { AiTwotoneSchedule } from "react-icons/ai";
import { PiStudent } from "react-icons/pi";
import { FaChalkboardTeacher, FaUser  } from "react-icons/fa";
import { MdOutlineSubject } from "react-icons/md";
import { BiSolidNotification } from "react-icons/bi";
import { SiGoogleclassroom } from "react-icons/si";
import { showSideBar } from '../../redux/userRelated/userHandle'
import { useSelector, useDispatch } from 'react-redux';

function AdminSidebar() {
    const dispatch = useDispatch()

    const { isOpen } = useSelector(state => state.user);



    return (
        <>
            <Card className={isOpen ? "h-screen w-full max-w-[17rem] p-4 shadow-xl shadow-blue-gray-900/5" : 'hidden'}>
                <div className="mb-2 p-4 flex justify-between items-center gap-2">
                    <Typography variant="h5" color="black">
                        Quản lý nhà trường
                    </Typography>
                    <Button className='text-white' onClick={() => dispatch(showSideBar())}>X</Button>
                </div>

                <List className=''>
                    <NavLink className="w-full flex gap-2 px-3 py-2 rounded-lg items-center hover:bg-gray-500" to={"/"}>
                        <TfiDashboard className='size-6' />
                        Trang chủ
                    </NavLink>
                    <NavLink className="w-full flex gap-2 px-3 py-2 rounded-lg items-center hover:bg-gray-500" to={"/admin/students/"}>
                        <PiStudent className='size-6' />
                        Học sinh
                    </NavLink>
                    <NavLink className="w-full flex gap-2 px-3 py-2 rounded-lg items-center hover:bg-gray-500" to={"/admin/teachers/"}>
                        <FaChalkboardTeacher />
                        Giáo viên
                    </NavLink>
                    <NavLink className="w-full flex gap-2 px-3 py-2 rounded-lg items-center hover:bg-gray-500" to={"/admin/activities/"}>
                        <MdOutlineSubject />
                        Hoạt động
                    </NavLink>
                    <NavLink className="w-full flex gap-2 px-3 py-2 rounded-lg items-center hover:bg-gray-500" to={"/admin/notices/"}>
                        <BiSolidNotification />
                        Thông báo
                    </NavLink>
                    <NavLink className="w-full flex gap-2 px-3 py-2 rounded-lg items-center hover:bg-gray-500" to={"/admin/timetable/"}>
                        <AiTwotoneSchedule />
                        Thời khóa biểu
                    </NavLink>
                    <NavLink className="w-full flex gap-2 px-3 py-2 rounded-lg items-center hover:bg-gray-500" to={"/admin/classes/"}>
                    <SiGoogleclassroom />
                        Lớp
                    </NavLink>
                    <NavLink className="w-full flex gap-2 px-3 py-2 rounded-lg items-center hover:bg-gray-500" to={"/admin/user/"}>
                    <FaUser />
                        Phụ huynh
                    </NavLink>
                </List>
            </Card>


        </>

    )
}

export default AdminSidebar