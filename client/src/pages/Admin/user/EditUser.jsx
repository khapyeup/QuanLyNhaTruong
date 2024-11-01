import { Input, Button } from '@material-tailwind/react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../../redux/userRelated/userHandle';
import { updateParent } from '../../../redux/parentRelated/parenHandle';

function EditUser() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const { id } = useParams();

    const { parentList, loading } = useSelector(state => state.parent);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const parent = parentList.find((parent) => parent._id === id)

    const onSubmit = (data) => {
        const user = {
            username: data.username,
            password: data.password,
            profile: data.file[0].name,
            parent_info: {
                fatherName: data.fatherName,
                fatherPhone: data.fatherPhone,
                fatherEmail: data.fatherEmail,
                fatherPassport: data.fatherPassport,
                fatherAge: data.fatherAge,
                motherName: data.motherName,
                motherPhone: data.motherPhone,
                motherEmail: data.motherEmail,
                motherPassport: data.motherPassport,
                motherAge: data.motherAge,
            },
        }
        dispatch(updateParent(user, id));
        navigate('/admin/user');
    }

   
    

    return (
        <>
            {loading ? <p>Đang load</p> : (
                <div className='w-1/3 p-3 mx-auto my-6'>
                    <h1 className='font-bold'>Cập nhật tài khoản</h1>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='flex flex-col gap-2 md:gap-4 mt-5'>
                            <div className='border p-3 rounded-xl flex flex-col gap-2 md:gap-4 mt-5'>
                                <Input type='text' label='Tên đăng nhập' {...register('username', { required: true })} name='username' defaultValue={parent?.username}/>
                                {errors.username?.type === 'required' && <p className='text-red-800'>Cần nhập tên đăng nhập</p>}

                                <Input type='password' label='Mật khẩu' {...register('password', { required: true })} name='password'  defaultValue={parent?.password}/>
                                {errors.password?.type === 'required' && <p className='text-red-800'>Cần nhập mật khẩu</p>}
                            </div>


                            <div className='border p-3 rounded-xl flex flex-col gap-2 md:gap-4 mt-5'>
                                <h1>Thông tin cha</h1>

                                <Input type='text' label='Tên cha' {...register('fatherName', { required: true })} name='fatherName'  defaultValue={parent.parentInfo?.fatherName}/>
                                <Input type='number' label='Tuổi' {...register('fatherAge', { required: true })} name='fatherAge' defaultValue={parent.parentInfo?.fatherAge}/>
                                <Input type='text' label='Email' {...register('fatherEmail', { required: true })} name='fatherEmail'  defaultValue={parent.parentInfo?.fatherEmail}/>
                                <Input type='text' label='Điện thoại' {...register('fatherPhone', { required: true })} name='fatherPhone'  defaultValue={parent.parentInfo?.fatherPhone}/>
                                <Input type='text' label='CCCD' {...register('fatherPassport', { required: true })} name='fatherPassport'  defaultValue={parent.parentInfo?.fatherPassport}/>
                            </div>

                            <div className='border p-3 rounded-xl flex flex-col gap-2 md:gap-4 mt-5'>
                                <h1>Thông tin mẹ</h1>
                                <Input type='text' label='Tên mẹ'  {...register('motherName', { required: true })} name='motherName' defaultValue={parent.parentInfo?.motherName}/>
                                <Input type='number' label='Tuổi' {...register('motherAge', { required: true })} name='motherAge' defaultValue={parent.parentInfo?.motherAge}/>
                                <Input type='text' label='Email' {...register('motherEmail', { required: true })} name='motherEmail' defaultValue={parent.parentInfo?.motherEmail}/>
                                <Input type='text' label='Điện thoại' {...register('motherPhone', { required: true })} name='motherPhone' defaultValue={parent.parentInfo?.motherPhone}/>
                                <Input type='text' label='CCCD' {...register('motherPassport', { required: true })} name='motherPassport'defaultValue={parent.parentInfo?.motherPassport} />
                            </div>
                            <label htmlFor='profile'>Avatar</label>
                            <input type='file' id='profile' name='profile' {...register("profile")} required />

                            <div className='flex justify-between flex-col lg:flex-row gap-2 '>
                                <Button type='submit'>Thêm tài khoản</Button>
                                <Link to={'/admin/user/'}><Button className='bg-red-600 w-full'>Hủy bỏ</Button></Link>
                            </div>

                        </div>
                    </form>

                </div>
            )}
        </>
    )
}

export default EditUser;
