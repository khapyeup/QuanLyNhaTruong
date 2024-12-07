import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Card, Typography, Button, List } from '@material-tailwind/react'


import { TfiDashboard } from "react-icons/tfi";
import { PiStudent } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { VscBellDot } from "react-icons/vsc";
import { BiSolidNotification } from "react-icons/bi";
import { MdOutlineRateReview } from "react-icons/md";



function ParentSidebar() {
    const dispatch = useDispatch()
    const navItem = [
        {
            label: 'Trang chủ',
            icon: <TfiDashboard className='text-xl'/>,
            href: '/'
        },
        {
            label: 'Học sinh',
            icon: <PiStudent  className='text-xl'/>,
            href: '/parent/student'
        },
        {
            label: 'Thông báo',
            icon: <VscBellDot  className='text-xl'/>,
            href: '/parent/notice'
        },
        {
            label: 'Nhắn tin',
            icon: <FaChalkboardTeacher  className='text-xl'/>,
            href: '/parent/messages'
        },
        {
            label: 'Học phí',
            icon: <BiSolidNotification  className='text-xl'/>,
            href: '/parent/payments'
        },
        {
            label: 'Đánh giá',
            icon: <MdOutlineRateReview   className='text-xl'/>,
            href: '/parent/complaints'
        }
    ];
    
    return (
        <div className='flex flex-col gap-4'>
            {navItem.map((item) => (
                <div className='' key={item.label}>
                    <NavLink className=' flex items-center gap-2 text-[14px] justify-center lg:justify-start text-gray-700 hover:scale-105 transition hover:text-black' to={item.href}>
                    {item.icon}
                    <p className='hidden lg:block'>{item.label}</p>
                    </NavLink>
                </div>
            ))}
        </div>
    )
}

export default ParentSidebar