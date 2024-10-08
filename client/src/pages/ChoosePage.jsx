import React, { useEffect } from 'react'
import { Link, redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';


function ChoosePage() {
    const redirects = redirect();


    const {status, currentUser, currentRole} = useSelector(state => state.user)

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
    <div>ChoosePage</div>
    <Link to="/Adminlogin"><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-4">Login as admin</button></Link>
    <Link to="/Parentlogin"><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login as parent</button></Link>
    </>
}

export default ChoosePage