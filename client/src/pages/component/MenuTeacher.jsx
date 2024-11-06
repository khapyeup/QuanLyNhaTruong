import React from 'react'
import { Link, NavLink } from 'react-router-dom';

import { TbLayoutDashboard } from "react-icons/tb";
import { PiStudent } from "react-icons/pi";
import { FaRegCalendarCheck } from "react-icons/fa";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { AiFillSchedule } from "react-icons/ai";


function MenuTeacher() {
    const navItem = [
        {
            label: 'Trang chủ',
            icon: <TbLayoutDashboard className='text-xl'/>,
            href: '/'
        },
        {
            label: 'Học sinh',
            icon: <PiStudent  className='text-xl'/>,
            href: '/students'
        },
        {
            label: 'Điểm danh',
            icon: <FaRegCalendarCheck  className='text-xl'/>,
            href: '/attendance'
        },
        {
            label: 'Tin nhắn',
            icon: <IoChatbubbleEllipses  className='text-xl'/>,
            href: '/messages'
        },
        {
            label: 'Thời khoá biểu',
            icon: <AiFillSchedule  className='text-xl'/>,
            href: '/schedule'
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

export default MenuTeacher