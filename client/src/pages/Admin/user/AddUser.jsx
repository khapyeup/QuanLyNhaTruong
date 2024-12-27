import { Input, Button } from '@material-tailwind/react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react'
import { useAddParentMutation } from '../../../redux/parentRelated/parentApiSlice';
import { toast } from 'react-toastify';
import { uploadFile } from '../../../helpers/uploadFile';

export default function AddUser() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [addParent, {isLoading}] = useAddParentMutation();
    const navigate = useNavigate();

    const [avatarUrl, setAvatarUrl] = useState('');

    const uploadAvatar = async (e) => {
        await uploadFile(e.target.files[0]).then((response) =>
            setAvatarUrl(response.url)
        );
    };

    const onSubmit = (data) => {


        const user = {
            username: data.username,
            password: data.password,
            profile: avatarUrl,
            parentInfo: {
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
            student_id: [],
            class_id: []
        }

        addParent(user).unwrap().then(res => toast.success(res.message)).then(() =>navigate('/admin/user/') )
        


    }
    return (
        <div className='w-1/3 p-3 mx-auto my-6'>
            <h1 className='font-bold'>Thêm tài khoản</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col gap-2 md:gap-4 mt-5'>
                    <div className='border p-3 rounded-xl flex flex-col gap-2 md:gap-4 mt-5'>
                        <Input type='text' label='Tên đăng nhập' {...register('username', { required: true })} name='username' />
                        {errors.username?.type === 'required' && <p className='text-red-800'>Cần nhập tên đăng nhập</p>}

                        <Input type='password' label='Mật khẩu' {...register('password', { required: true })} name='password' />
                        {errors.password?.type === 'required' && <p className='text-red-800'>Cần nhập mật khẩu</p>}
                    </div>


                    <div className='border p-3 rounded-xl flex flex-col gap-2 md:gap-4 mt-5'>
                        <h1>Thông tin cha</h1>

                        <Input type='text' label='Tên cha' {...register('fatherName', { required: true })} name='fatherName' />
                        <Input type='number' label='Tuổi' {...register('fatherAge', { required: true })} name='fatherAge' />
                        <Input type='text' label='Email' {...register('fatherEmail', { required: true })} name='fatherEmail' />
                        <Input type='text' label='Điện thoại' {...register('fatherPhone', { required: true })} name='fatherPhone' />
                        <Input type='text' label='CCCD' {...register('fatherPassport', { required: true })} name='fatherPassport' />
                    </div>

                    <div className='border p-3 rounded-xl flex flex-col gap-2 md:gap-4 mt-5'>
                        <h1>Thông tin mẹ</h1>
                        <Input type='text' label='Tên mẹ'  {...register('motherName', { required: true })} name='motherName' />
                        <Input type='number' label='Tuổi' {...register('motherAge', { required: true })} name='motherAge' />
                        <Input type='text' label='Email' {...register('motherEmail', { required: true })} name='motherEmail' />
                        <Input type='text' label='Điện thoại' {...register('motherPhone', { required: true })} name='motherPhone' />
                        <Input type='text' label='CCCD' {...register('motherPassport', { required: true })} name='motherPassport' />
                    </div>
                    <label htmlFor='profile'>Avatar</label>
                    {avatarUrl && <img src={avatarUrl} alt='avatar' className='w-20 h-20 rounded-full' />}
                    
                    <input onChange={uploadAvatar} type='file' id='profile' name='profile'  required />

                    <div className='flex justify-between flex-col lg:flex-row gap-2 '>
                        <Button disabled={isLoading || !avatarUrl} type='submit'>Thêm tài khoản</Button>
                        <Link to={'/admin/user'}><Button className='bg-red-600 w-full'>Hủy bỏ</Button></Link>
                    </div>

                </div>
            </form>

        </div>
    )
}
