import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addStudent } from '../../../redux/studentRelated/studentHandle';
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { getParentList } from '../../../redux/parentRelated/parenHandle';
import { getClassList } from '../../../redux/sclassRelated/sclassHandle';
import { Button, Card, CardBody, Dialog, Input, Typography, Select, Option } from '@material-tailwind/react';

const AddStudent = ({ open, showModal }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm();

  const { parentList } = useSelector(state => state.parent)
  const { classList } = useSelector(state => state.sclass)

  const submitHandler = (e) => {
    dispatch(addStudent(e))
    window.location.reload();
   
  }

  useEffect(() => {
    dispatch(getParentList());
    dispatch(getClassList());
  }, [])
  return (
    <>
      <Dialog open={open} handler={showModal} className=''>

        <Card>
          <CardBody className='w-50'>
            <Typography variant='h4'>Thêm học sinh</Typography>
            <form className=" flex flex-col gap-2" onSubmit={handleSubmit(submitHandler)}>
              <label>Họ và tên</label>
              <Input label='Họ và tên' className='border p-2 rounded-lg shadow-lg' {...register("name", { required: "Không được bỏ trống họ và tên" })} placeholder='Họ và tên' type="text" name="name" id='name' />
              <label>Ngày sinh</label>
              <Input label='Ngày sinh' className='border p-2 rounded-lg shadow-lg'  {...register("dob", { required: "Không được bỏ trống tuổi" })} type="date" name="dob" placeholder='Ngày sinh' id="dob" />

              <label>Chọn lớp</label>
              <select className='border p-2 rounded-lg shadow-lg'  {...register("class_id")} name="class_id" >
                {classList ? classList.map(el =>
                  <option value={el._id} key={el._id}>{el.name}</option>
                ) : ''}
              </select>
              <label>Chọn tài khoản phụ huynh</label>
              <select className='border p-2 rounded-lg shadow-lg'  {...register("user_id")} name="user_id" id="user_id">
                {parentList ? parentList.map(el =>
                  <option value={el._id} key={el.username}>{el.username}</option>
                ) : ''}
              </select>
              
              <label>Chọn giới tính</label>
              <select className='border p-2 rounded-lg shadow-lg'  {...register("gender", {required: "Chưa chọn giới tính"})} name="gender" id="gender">
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>

                <label>Địa chỉ</label>
              <Input label='Địa chỉ'  {...register("address", { required: "Không được bỏ trống địa chỉ" })} type="text" name="address" placeholder='Địa chỉ' id="address" />

              {errors.name && <p className='text-red-800 font-bold'>* {errors.name.message}</p>}
              {errors.age && <p className='text-red-800 font-bold'>* {errors.age.message}</p>}
              {errors.age && <p className='text-red-800 font-bold'>* {errors.parentname.message}</p>}
              <Button className=" hover:bg-slate-400 text-white rounded-lg p-2" type="submit">Thêm học sinh</Button>
              <Button className="bg-cyan-700 text-white rounded-lg p-2" onClick={showModal}>Hủy bỏ</Button>
            </form>
          </CardBody>
        </Card>




      </Dialog>


    </>
  )
}

export default AddStudent