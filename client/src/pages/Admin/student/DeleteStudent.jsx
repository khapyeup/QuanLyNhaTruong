import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { deleteStudent } from '../../../redux/studentRelated/studentHandle'

function DeleteStudent() {
  const {error, response} = useSelector(state => state.student)
  const params = useParams();
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleOKClick = () => {
    dispatch(deleteStudent(params.id))
 
    if (error)
      alert("Something wrong, cannot delete")
    else 
      alert("Xóa thành công")
    navigate("/admin/students")
  }

  const handleCancelClick = () => {
    navigate("/admin/students")
  }

  return (
    <div>
      <p>Xác nhận xóa</p>
      <button onClick={handleOKClick}>Ok</button>
      <button onClick={handleCancelClick}>Hủy bỏ</button>
    </div>
  )
}

export default DeleteStudent