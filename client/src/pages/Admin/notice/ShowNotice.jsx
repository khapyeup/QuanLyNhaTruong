import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import Modal from '../../component/Modal';
import { getNoticeList, getDetailNotice, updateNotice, deleteNotice } from '../../../redux/noticeRelated/noticeHandle';
import {
  Card,
  CardBody,
  CardFooter,
  Input,

  Button,
  Typography,
  Textarea
} from "@material-tailwind/react";


function ShowNotice() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { noticeList, error, response, message } = useSelector((state) => state.notice);


  const handleEditClick = (e) => {
    e.preventDefault();
    const form = e.target;
    const id = form.id.value;
    const title = form.title.value;
    const content = form.content.value;

    dispatch(updateNotice(id, { title, content }))
    if (response || error)
      alert(response.message)
    else
      alert("Sửa thành công");
  }

  const handleAddNotice = () => {
    return navigate("/admin/notices/add")
  }

  const handleDelete = (_id) => {
    dispatch(deleteNotice(_id));
    window.location.reload();
  }

  useEffect(() => {
    dispatch(getNoticeList())
  }, [])
  return <>
    {message ? <p className='w-full p-2 bg-green-500'>{message}</p> : ''}



    <div className='p-9 flex flex-col gap-y-5'>
      <Button class="bg-light-blue-600 text-white p-2 rounded-lg" onClick={handleAddNotice}>Thêm thông báo</Button>

      <table className='w-full min-w-full table-auto text-left'>
        <thead className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
          <tr>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">ID</th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              Tiêu đề
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              Ngày tạo
            </th>

            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 "></th>
          </tr>
        </thead>
        <tbody>
          {noticeList.map((notice, index) =>
            <tr key={index} className="even:bg-blue-gray-50/50">
              <td className='p-4'>{index + 1}</td>
              <td className='p-4'>{notice.title}</td>
              <td className='p-4'>{notice.date}</td>

              <td className="p-4 justify-evenly flex">
                <Link to={`/admin/notices/view/${notice._id}`}>
                  <Button className="bg-green-700">Chi tiết</Button>
                </Link>
                <Modal buttonData={"Chỉnh sửa"} buttonColor={"bg-orange-500 "}>
                  <form onSubmit={handleEditClick}>
                    <Card className="mx-auto w-full max-w-[24rem]">
                      <CardBody className="flex flex-col gap-4">
                        <Typography variant="h4" color="blue-gray">
                          Nhập thông tin chỉnh sửa
                        </Typography>

                        <input type='text' name="id" readOnly hidden value={notice._id}></input>
                        <Input required type='text' name="title" label="Tiêu đề" size="lg" defaultValue={notice.title} />

                        <Textarea name="content" label='Nội dung' defaultValue={notice.content} />



                      </CardBody>
                      <CardFooter className="pt-0">
                        <Button type='submit' variant="gradient" fullWidth>
                          Chỉnh sửa
                        </Button>
                      </CardFooter>
                    </Card>
                  </form>
                </Modal>
                <Modal buttonData={"Xóa"} buttonColor={"bg-red-500"}>
                  <Card>

                    <CardBody>
                      <Typography>Xác nhận xóa?</Typography>
                      <div className='flex gap-5'>
                        <Button className='bg-red-400' onClick={() => handleDelete(notice._id)}>OK</Button>
                        <Button onClick={() => window.location.reload()}>Hủy</Button>
                      </div>

                    </CardBody>
                  </Card>
                </Modal>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

  </>


}

export default ShowNotice