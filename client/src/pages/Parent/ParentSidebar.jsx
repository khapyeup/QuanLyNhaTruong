import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Card, Typography, Button, List } from '@material-tailwind/react'
import { showSideBar } from '../../redux/userRelated/userHandle';

import { TfiDashboard } from "react-icons/tfi";
import { PiStudent } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { VscBellDot } from "react-icons/vsc";
import { BiSolidNotification } from "react-icons/bi";




function ParentSidebar() {
    const dispatch = useDispatch()

    const { isOpen } = useSelector(state => state.user);
    return (
        <Card className={isOpen ? "h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5" : 'hidden'}>
            <div className="mb-2 p-4 flex justify-between items-center gap-2">
                <Typography variant="h5" >
                    Nhà trường ABC
                </Typography>
                <Button className='' onClick={() => dispatch(showSideBar())}>X</Button>
            </div>

            <List className=''>
                <NavLink className="w-full flex gap-2 px-3 py-2 rounded-lg items-center hover:bg-gray-500" to={"/"}>
                    <TfiDashboard className='size-6' />
                    Trang chủ
                </NavLink>
                <NavLink className="w-full flex gap-2 px-3 py-2 rounded-lg items-center hover:bg-gray-500" to={"/parent/student/"}>
                    <PiStudent className='size-6' />
                    Học sinh
                </NavLink>
                <NavLink className="w-full flex gap-2 px-3 py-2 rounded-lg items-center hover:bg-gray-500" to={"/parent/notice/"}>
                    <VscBellDot />
                    Thông báo
                </NavLink>
                <NavLink className="w-full flex gap-2 px-3 py-2 rounded-lg items-center hover:bg-gray-500" to={"/parent/message/"}>
                    <FaChalkboardTeacher />
                    Nhắn tin
                </NavLink>
                <NavLink className="w-full flex gap-2 px-3 py-2 rounded-lg items-center hover:bg-gray-500" to={"/parent/finance/"}>
                    <BiSolidNotification />
                    Học phí
                </NavLink>
            </List>
        </Card>
    )
}

export default ParentSidebar