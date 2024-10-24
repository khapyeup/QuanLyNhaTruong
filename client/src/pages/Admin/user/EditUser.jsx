import { Input, Button } from '@material-tailwind/react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUser } from '../../../redux/userRelated/userHandle';

function EditUser() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { userDetails, loading } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const onSubmit = (data) => {
        const user = {
            username: data.username,
            password: data.password,
            role: 'parent',
            contact_info: {
                father_name: data.father_name,
                father_phone: data.father_phone,
                father_email: data.father_email,
                father_cccd: data.father_cccd,
                mother_name: data.mother_name,
                mother_phone: data.mother_phone,
                mother_email: data.mother_email,
                mother_cccd: data.mother_cccd,
            },
            student_id: [],
            class_id: []
        }
        dispatch(updateUser(user, id));
        navigate('/admin/user');
    }

    useEffect(() => {
        dispatch(getUserDetails(id));
    }, [id]);

    useEffect(() => {
        if (userDetails) {
            setValue('username', userDetails.username);
            setValue('password', userDetails.password);
            setValue('father_name', userDetails.contact_info?.father_name);
            setValue('father_email', userDetails.contact_info?.father_email);
            setValue('father_phone', userDetails.contact_info?.father_phone);
            setValue('father_cccd', userDetails.contact_info?.father_cccd);
            setValue('mother_name', userDetails.contact_info?.mother_name);
            setValue('mother_email', userDetails.contact_info?.mother_email);
            setValue('mother_phone', userDetails.contact_info?.mother_phone);
            setValue('mother_cccd', userDetails.contact_info?.mother_cccd);
        }
    }, [userDetails]);

    return (
        <>
            {loading ? <p>Đang load</p> : (
                <div className='w-1/3 border-2 p-3 mx-auto my-6'>
                    <h1>Cập nhật tài khoản</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='flex flex-col gap-2 md:gap-4 mt-5'>
                            <Input type='text' label='Tên đăng nhập' {...register('username', { required: true })} />
                            {errors.username?.type === 'required' && <p className='text-red-800'>Cần nhập tên đăng nhập</p>}
                            <Input type='password' label='Mật khẩu' {...register('password', { required: true })} />
                            {errors.password?.type === 'required' && <p className='text-red-800'>Cần nhập mật khẩu</p>}
                            <div className='border-2 p-2 border-gray-700 flex flex-col gap-2 md:gap-4 mt-5'>
                                <h1>Thông tin cha</h1>
                                <Input type='text' label='Tên cha' {...register('father_name', { required: true })} />
                                <Input type='text' label='Email' {...register('father_email', { required: true })} />
                                <Input type='text' label='Điện thoại' {...register('father_phone', { required: true })} />
                                <Input type='text' label='CCCD' {...register('father_cccd', { required: true })} />
                            </div>
                            <div className='border-2 p-2 border-gray-700 flex flex-col gap-2 md:gap-4 mt-5'>
                                <h1>Thông tin mẹ</h1>
                                <Input type='text' label='Tên mẹ' {...register('mother_name', { required: true })} />
                                <Input type='text' label='Email' {...register('mother_email', { required: true })} />
                                <Input type='text' label='Điện thoại' {...register('mother_phone', { required: true })} />
                                <Input type='text' label='CCCD' {...register('mother_cccd', { required: true })} />
                            </div>
                            <div className='flex justify-between flex-col lg:flex-row gap-2 '>
                                <Button type='submit'>Cập nhật</Button>
                                <Link to={'/admin/user'}><Button className='bg-red-600 w-full'>Hủy bỏ</Button></Link>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </>
    )
}

export default EditUser;
