import React, { useEffect } from 'react'
import { IoMdClose } from "react-icons/io";
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { updateStudent } from '../../../redux/studentRelated/studentHandle';
import { Card, CardBody, Typography, Input, CardFooter, Button } from '@material-tailwind/react';

function UpdateStudent({ onClose, student }) {
    const dispatch = useDispatch();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const { classList } = useSelector(state => state.sclass)
    const { parentList } = useSelector(state => state.parent)



    const submit = (data) => {
        const { name, student_id, dob, gender, class_id, user_id, address } = data;

        dispatch(updateStudent(student._id, { name, student_id, dob, gender, class_id, user_id, address }))

        onClose();
    }


    return <>
        <div className='inset-0 fixed flex justify-center items-center bg-black/20' onClick={onClose}>
            <div className='opacity-100 bg-white w-1/4 px-2 py-3 rounded-lg' onClick={(e) => e.stopPropagation()}>
                <div className='flex justify-between items-center'>
                    
                    <p className='text-center w-full'>Nhập thông tin chỉnh sửa</p>
                    <IoMdClose onClick={onClose} className='cursor-pointer text-2xl text-red-500 hover:text-black' />
                </div>
                <form onSubmit={handleSubmit(submit)}>
                    <Card className="mx-auto w-full max-w-[24rem]">
                        <CardBody className="flex flex-col gap-4">

                            <Input type='text' name="name" label="Họ và tên" size="lg" {...register("name", { required: true })} defaultValue={student.name} />

                            <Input type='text' name='student_id' label='Mã định danh' {...register("student_id", { required: true })} size='lg' defaultValue={student.student_id} />

                            <Input name="dob" type="date" label="Ngày sinh" size="lg" {...register("dob", { required: true })} defaultValue={student.dob} />

                            <label>Giới tính</label>
                            <select className='border-2 p-2 rounded-lg' name="gender" label="Giới tính" size="lg" {...register("gender", { required: true })} value={student.gender}>
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                            </select>

                            <label>Lớp</label>
                            <select className='border-2 p-2 rounded-lg' required name="class_id" label="Lớp" size="lg"  {...register("class_id", { required: true })} value={student.class_id?._id}>
                               <option></option>
                                {classList ? classList.map(el =>
                                    <option value={el._id} key={el._id}>{el.name}</option>
                                ) : ''}
                            </select>

                            <label htmlFor='user_id'>Tài khoản phụ huynh</label>
                            <select required id="user_id" className='border-2 p-2 rounded-lg' name="user_id" label="Phụ huynh" size="lg" {...register("user_id", { required: true })} value={student.user_id?._id}>
                                <option></option>
                                {parentList ? parentList.map(el =>
                                    <option value={el._id} key={el._id}>{el.username}</option>
                                ) : ''}
                            </select>

                            <Input name="address" type="text" label="Địa chỉ" size="lg" {...register("address", { required: true })} value={student.address} />


                        </CardBody>
                        <CardFooter className="pt-0">
                            <Button type='submit' variant="gradient" fullWidth>
                                Chỉnh sửa
                            </Button>

                        </CardFooter>
                    </Card>
                </form>
            </div>
        </div>
    </>



}

export default UpdateStudent