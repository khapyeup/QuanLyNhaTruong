import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateTeacher } from '../../../redux/teacherRelated/teacherHandle';
import { useForm } from "react-hook-form"
import { getClassList } from '../../../redux/sclassRelated/sclassHandle';
import { Button, Typography, Input, Card } from '@material-tailwind/react';
import { getActivityList } from '../../../redux/activityRelated/activityHandle';

const UpdateTeacher = ({teacher, open}) => {
    const dispatch = useDispatch()

    const { register, handleSubmit, formState: { errors } } = useForm();

    const { classList } = useSelector(state => state.sclass);
    const { activityList } = useSelector(state => state.activity);

    const onSubmit = (data) => {
        data.profile = data.profile[0].name;
        dispatch(updateTeacher(teacher._id, data));
        open();
    }

    useEffect(() => {
        dispatch(getClassList());
        dispatch(getActivityList());
    }, [])
    return (
        <>
            <Card color="transparent" className='items-center pt-2'>
                <Typography variant="h4" color="blue-gray">
                    Cập nhật giáo viên
                </Typography>

                <form className="mt-2 mb-2 sm:w-72" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-1 flex flex-col gap-2">

                        <Input
                            type="text"
                            name='username'
                            label='Tên đăng nhập'
                            {...register("username")}
                            required
                            defaultValue={teacher.username}
                        />

                        <Input
                            type="password"
                            name='password'
                            label='Mật khẩu'
                            {...register("password")}
                            required
                            defaultValue={teacher.password}
                        />


                        <Input
                            type='text'
                            label='Tên giáo viên'
                            name='name'
                            {...register("name")}
                            required
                            defaultValue={teacher.teacherInfo.name}
                        />


                        <Input
                            label='Tuổi'
                            type='number'
                            name='age'
                            {...register("age")}
                            required
                            defaultValue={teacher.teacherInfo.age}
                        />


                        <Input
                            label='Email'
                            type='email'
                            name='email'
                            {...register("email", { required: true })}
                            required
                            defaultValue={teacher.teacherInfo.email}
                        />


                        <Input
                            label='Số điện thoại'
                            type='text'
                            name='phone'
                            {...register("phone", { required: true })}
                            required
                            defaultValue={teacher.teacherInfo.phone}
                        />
                        <div className='flex flex-col'>
                            <label htmlFor='gender'>Giới tính</label>
                            <select className='border-2 p-1' name="gender" id='gender' {...register("gender", { required: true })} required
                            defaultValue={teacher.teacherInfo.gender}
                            >
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                            </select>
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor='sclass'>Lớp</label>
                            <select className='border-2 p-1' name="sclass" id='sclass' {...register("sclass", { required: true })} required defaultValue={teacher.teacherInfo.class._id}>
                                {classList.map((sclass) => (
                                    <option value={sclass._id}>{sclass.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor='activityAssign'>Hoạt động</label>
                            <select className='border-2 p-1' name="activityAssign" id='activityAssign' {...register("activityAssign", { required: true })} required defaultValue={teacher.teacherInfo.activityAssign}>
                                {activityList.map((activity) => (
                                    <option value={activity._id}>{activity.group_activity}</option>
                                ))}
                            </select>
                        </div>



                        <label htmlFor='profile'>Ảnh đại diện</label>
                        <input
                            {...register("profile")}
                            id='profile'
                            type='file'
                            name='profile'
                            required
                            
                        />
                    </div>

                    <Button type='submit' className='mt-2' fullWidth>
                        Thêm
                    </Button>

                </form>
            </Card>
        </>
    )
}

export default UpdateTeacher