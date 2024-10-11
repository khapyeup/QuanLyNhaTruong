import React from 'react'
import { NavLink } from 'react-router-dom'

function AdminSidebar() {


    return (
        <>
            <div className='w-full h-full flex flex-col gap-6 p-5'>
                <h1 className="flex gap-1 items-center">
                    <p className="bg-blue-600 p-2 rounded-lg"></p>
                </h1>
                <div className="flex-1 flex flex-col gap-y-5 py-8 text-white">
                    <NavLink className="w-full flex gap-2 px-3 py-2 rounded-lg items-center hover:bg-slate-600" to={"/"}>Trang chủ</NavLink>
                    <NavLink className="w-full flex gap-2 px-3 py-2 rounded-lg items-center hover:bg-slate-600" to={"/admin/students/"}>Học sinh</NavLink>
                    <NavLink className="w-full flex gap-2 px-3 py-2 rounded-lg items-center hover:bg-slate-600" to={"/admin/teachers/"}>Giáo viên</NavLink>
                    <NavLink className="w-full flex gap-2 px-3 py-2 rounded-lg items-center hover:bg-slate-600" to={"/admin/subjects/"}>Môn học</NavLink>
                    <NavLink className="w-full flex gap-2 px-3 py-2 rounded-lg items-center hover:bg-slate-600" to={"/admin/notices/"}>Thông báo</NavLink>
                </div>
            </div>
        </>

    )
}

export default AdminSidebar