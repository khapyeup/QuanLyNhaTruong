import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authLogout } from '../../redux/userRelated/userSlice';


function NavTeacher() {
    const dispatch = useDispatch();
    
    const [open, setOpen] = useState(false);
    
    const { currentUser } = useSelector(state => state.user);

    const logout = () => {
        dispatch(authLogout());
    }
    return (
        <div className='flex items-center justify-end px-2 bg-white'>

            {/* Icon and user */}
            <div className='flex gap-2 items-center'>
                <div>
                    <p>{currentUser.username}</p>
                    <p className='font-bold'>{currentUser.role}</p>
                </div>
                <img onClick={() => setOpen(!open)} className='size-12 object-cover rounded-full border-2 cursor-pointer' src={currentUser.profile} />
                {open && (
                    <div className='absolute z-10 top-[48px] right-10 border-2 rounded-lg'>
                        <p onClick={logout} className='bg-white p-2 hover:bg-blue-gray-50 cursor-pointer'>Đăng xuất</p>
                    </div>
                )}

            </div>
        </div>
    )
}

export default NavTeacher