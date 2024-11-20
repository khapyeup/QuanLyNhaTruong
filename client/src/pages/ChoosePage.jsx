import React, { useEffect } from 'react'
import { Link, redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button
  } from "@material-tailwind/react";

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
    <div className='grid place-items-center w-full h-screen'>
    <Card className="md:w-1/2 bg-black">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 rounded-none"
      >
        <img
          src="/bgchooseacc.png"
          alt="Background"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h4" color='white'>
          Bạn muốn đăng nhập bằng tài khoản nào?
        </Typography>
        <div className="flex gap-6 mt-6">
        <Link to="/adminlogin"><Button className='bg-red-700 hover:bg-red-800'>Admin</Button></Link>
        <Link to="/teacherlogin"><Button className='bg-red-700 hover:bg-red-800'>Giáo viên</Button></Link>
       <Link to="/Parentlogin"><Button className='bg-red-700 hover:bg-red-800'>Phụ huynh</Button></Link>
        </div>
        
      </CardBody>
      
    </Card>
    </div>
    </>
}

export default ChoosePage