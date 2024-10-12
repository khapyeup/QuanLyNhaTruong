import React, { useEffect } from 'react'
import { Link, redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';


function ChoosePage() {
    const redirects = redirect();


    const { status, currentUser, currentRole } = useSelector(state => state.user)

    useEffect(() => {
        if (status === "success" || currentUser !== null) {
            if (currentRole === "Admin") {
                redirect("/Admin/dashboard")
            } else if (currentRole === "Parent") {
                redirect("/Parent/dashboard")
            }
        } else if (status === "error") {
            alert("network error")
        }
    }, [currentRole, currentUser, status, redirects])

    return <>
        <div className='grid place-items-center w-full h-screen bg-white'>
            <div>
                <Link to="/Adminlogin">
                    <button className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-4">Admin</button>
                </Link>
                <Link to="/Parentlogin">
                    <button className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-4">Phụ huynh</button>
                </Link>
            </div>

        </div>

    </>
}

export default ChoosePage