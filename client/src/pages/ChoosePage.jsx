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
    <div className='grid place-items-center w-full h-screen bg-white'>
    <Card className="max-w-[24rem] overflow-hidden">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 rounded-none"
      >
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
          alt="ui/ux review check"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h4" color="blue-gray">
          Bạn muốn đăng nhập bằng tài khoản nào?
        </Typography>
        <div class="flex justify-evenly">
        <Link to="/adminlogin"><Button className='hover:bg-blue-gray-600'>Admin</Button></Link>
       
       <Link to="/Parentlogin"><Button className='hover:bg-blue-gray-600'>Phụ huynh</Button></Link>
        </div>
        
      </CardBody>
      
    </Card>
    </div>
    </>
}

export default ChoosePage