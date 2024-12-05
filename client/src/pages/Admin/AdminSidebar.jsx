import { NavLink } from 'react-router-dom'
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
import { SiBuzzfeed } from "react-icons/si";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { useSelector, useDispatch } from 'react-redux';

function AdminSidebar() {
    const navItem = [
        {
            label: 'Trang chủ',
            icon: <TfiDashboard className='text-xl'/>,
            href: '/'
        },
        {
            label: 'Học sinh',
            icon: <PiStudent  className='text-xl'/>,
            href: '/admin/students'
        },
        {
            label: 'Giáo viên',
            icon: <FaChalkboardTeacher  className='text-xl'/>,
            href: '/admin/teachers'
        },
        {
            label: 'Thông báo',
            icon: <BiSolidNotification  className='text-xl'/>,
            href: '/admin/notices'
        },
        {
            label: 'Thời khoá biểu',
            icon: <AiTwotoneSchedule  className='text-xl'/>,
            href: '/admin/timetable'
        },
        {
            label: 'Lớp',
            icon: <SiGoogleclassroom className='text-xl'/>,
            href: '/admin/classes'
        },
        {
            label: 'Phụ huynh',
            icon: <FaUser className='text-xl'/>,
            href: '/admin/user'
        },
        {
            label: 'Hoạt động',
            icon: <MdOutlineSubject className='text-xl'/>,
            href: '/admin/activities'
        },
        {
            label: 'Phí',
            icon: <SiBuzzfeed className='text-xl'/>,
            href: '/admin/fees'
        },
        {
            label: 'Giao dịch',
            icon: <FaMoneyCheckDollar className='text-xl'/>,
            href: '/admin/payments'
        }
    ];


    return (
        <div className='flex flex-col gap-4 '>
            {navItem.map((item) => (
                <div className='min-w-8' key={item.label}>
                    <NavLink className='flex items-center gap-2 text-[14px] justify-center lg:justify-start text-gray-700 hover:scale-105 transition hover:text-black' to={item.href}>
                    {item.icon}
                    <p className='hidden lg:block'>{item.label}</p>
                    </NavLink>
                </div>
            ))}
        </div>
    )
    
}

export default AdminSidebar