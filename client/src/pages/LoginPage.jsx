import React, { useEffect, useState } from 'react'
import { Link, redirect, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../redux/userRelated/userHandle'
import { useForm } from 'react-hook-form';
import { current } from '@reduxjs/toolkit';

function LoginPage({ role }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const redirects = redirect();
    const { status, currentUser, currentRole, response, error } = useSelector(state => state.user)
    const [message, setMessage] = useState("")

    const submitHandler = (data) => {
        const username = data.username;
        const password = data.password;
        const fields = { username, password }
        dispatch(loginUser(fields, role))
    }

    useEffect(() => {
        if (status === "success" || currentUser !== null) {
            if (currentRole === "admin") {
                navigate("/Admin/dashboard")
            } else if (currentRole === "parent") {
                navigate("/Parent/dashboard")
            }
        } else if (status === "failed") {
            setMessage(response.message);
        } else if (status === "error") {
            setMessage(error.message);
        }
    }, [status, currentRole, navigate, error, response, currentUser])

    return <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your {role} account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                            Tên đăng nhập
                        </label>
                        <div className="mt-2">
                            <input
                                {...register("username", { required: "Chưa nhập tên đăng nhập" })}
                                id="username"
                                name="username"
                                type="text"
                                required
                                autoComplete="email"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Mật khẩu
                            </label>

                        </div>
                        <div className="mt-2">
                            <input
                                {...register("password", { required: "Chưa nhập mật khẩu" })}
                                id="password"
                                name="password"
                                type="password"
                                required
                                autoComplete="current-password"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    {errors.username && <p className='text-red-800 font-bold'>* {errors.username.message}</p>}
                    {errors.password && <p className='text-red-800 font-bold'>* {errors.password.message}</p>}
                    {message && <p className='text-red-800 font-bold'>* {message}</p>}
                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Đăng nhập
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </>
}

export default LoginPage