import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import {
    Card,
    Typography,
    List,
} from "@material-tailwind/react";
import { TfiDashboard } from "react-icons/tfi";
import { PiStudent } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdOutlineSubject } from "react-icons/md";
import { BiSolidNotification } from "react-icons/bi";


function AdminSidebar() {


    return (
        <>
            {/* <div className='w-full h-full flex flex-col gap-6 p-5'>
                <h1 className="flex gap-1 items-center">
                    <p className="bg-blue-600 p-2 rounded-lg"></p>
                </h1>
                <div className="flex-1 flex flex-col gap-y-5 py-8 text-white">
                    
                    <NavLink className="w-full flex gap-2 px-3 py-2 rounded-lg items-center hover:bg-slate-600" to={"/admin/students/"}>Học sinh</NavLink>
                    <NavLink className="w-full flex gap-2 px-3 py-2 rounded-lg items-center hover:bg-slate-600" to={"/admin/teachers/"}>Giáo viên</NavLink>
                    <NavLink className="w-full flex gap-2 px-3 py-2 rounded-lg items-center hover:bg-slate-600" to={"/admin/subjects/"}>Môn học</NavLink>
                    <NavLink className="w-full flex gap-2 px-3 py-2 rounded-lg items-center hover:bg-slate-600" to={"/admin/notices/"}>Thông báo</NavLink>
                </div>
            </div> */}
            <Card className="bg-black h-screen max-w-[16rem] p-4 shadow-xl shadow-blue-gray-900/5">
                <div className="mb-2 p-4">
                    <Typography variant="h5" color="white">
                        Quản lý nhà trường
                    </Typography>
                </div>

                <List className='text-white'>
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
                    <NavLink className="w-full flex gap-2 px-3 py-2 rounded-lg items-center hover:bg-gray-500" to={"/admin/subjects/"}>
                        <MdOutlineSubject />
                        Môn học
                    </NavLink>
                    <NavLink className="w-full flex gap-2 px-3 py-2 rounded-lg items-center hover:bg-gray-500" to={"/admin/notices/"}>
                    <BiSolidNotification />
                    Thông báo
                    </NavLink>
                </List>
            </Card>
        </>

    )
}

export default AdminSidebar