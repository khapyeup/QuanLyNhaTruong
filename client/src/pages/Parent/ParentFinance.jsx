import React, { useEffect } from 'react'
import { Card, CardHeader, CardBody, Typography } from '@material-tailwind/react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFinances, fetchFinancesByUserId } from '../../redux/financeRelated/financeHandle';

function ParentFinance() {
  const dispatch = useDispatch();

  const { finances } = useSelector(state => state.finance);
  const { currentUser } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(fetchFinancesByUserId(currentUser._id))
  }, [])
  return (
    <div className='container'>

      {/* Finance Records Display */}
      <Card className='mt-10 w-11/12 mx-auto min-w-max'>
        <CardHeader className='bg-black text-white p-2'>
          <Typography>Học phí chưa trả</Typography>
        </CardHeader>
        <CardBody>
          <table className='w-full text-left table-auto'>
            <thead>
              <tr>
                <th className='p-4 transition-colors cursor-pointer border-y border-gray-200 bg-gray-300'>Tên học sinh</th>
                <th className='p-4 transition-colors cursor-pointer border-y border-gray-200 bg-gray-300'>Nợ phí</th>
                <th className='p-4 transition-colors cursor-pointer border-y border-gray-200 bg-gray-300'>Đã trả</th>
                <th className='p-4 transition-colors cursor-pointer border-y border-gray-200 bg-gray-300'>Số tiền còn lại</th>
                <th className='p-4 transition-colors cursor-pointer border-y border-gray-200 bg-gray-300'>Ngày hết hạn</th>
                <th className='p-4 transition-colors cursor-pointer border-y border-gray-200 bg-gray-300'></th>
              </tr>
            </thead>
            <tbody>
              {finances.length > 0 ? (
                finances.map(finance => (
                  <tr key={finance.id}>
                    <td className='p-4 border-b border-gray-200'>{finance.student.name}</td>
                    <td className='p-4 border-b border-gray-200'>{finance.totalFees}</td>
                    <td className='p-4 border-b border-gray-200'>{finance.feesPaid}</td>
                    <td className='p-4 border-b border-gray-200'>{finance.outstandingFees}</td>
                    <td className='p-4 border-b border-gray-200'>{new Date(finance.dueDate).toLocaleDateString()}</td>
                    <td className='p-4 border-b border-gray-200'>
                      <button className='transition ease-in-out border-red-300 border p-2 rounded-lg text-red-500 hover:-translate-y-1 hover:scale-110 hover:bg-red-500 hover:text-white'>Thanh toán</button>
                    </td>
                  </tr>
                ))
              ) : (
                <p>Không tìm thấy nợ nào.</p>
              )}
            </tbody>
          </table>
        </CardBody>


      </Card>

      {/* Display payment */}
      <Card className='mt-10 w-11/12 mx-auto min-w-max'>
        <CardHeader className='bg-black text-white p-2'>
          <Typography>Lịch sử giao dịch</Typography>
        </CardHeader>
        <CardBody>
          <table className='w-full text-left table-auto'>
            <thead>
              <tr>
                <th className='p-4 transition-colors cursor-pointer border-y border-gray-200 bg-gray-300'>Tên học sinh</th>
                <th className='p-4 transition-colors cursor-pointer border-y border-gray-200 bg-gray-300'>Số tiền</th>
                <th className='p-4 transition-colors cursor-pointer border-y border-gray-200 bg-gray-300'>Hình thức thanh toán</th>
                <th className='p-4 transition-colors cursor-pointer border-y border-gray-200 bg-gray-300'>Ngày thanh toán</th>
              </tr>
            </thead>
            <tbody>
              {/* {finances.length > 0 ? (
                finances.map(finance => (
                  <tr key={finance.id}>
                    <td className='p-4 border-b border-gray-200'>{finance.student.name}</td>
                    <td className='p-4 border-b border-gray-200'>{finance.totalFees}</td>
                    <td className='p-4 border-b border-gray-200'>{finance.feesPaid}</td>
                    <td className='p-4 border-b border-gray-200'>{finance.outstandingFees}</td>
                    <td className='p-4 border-b border-gray-200'>{new Date(finance.dueDate).toLocaleDateString()}</td>
                    <td className='p-4 border-b border-gray-200'>
                      <button className='transition ease-in-out border-red-300 border p-2 rounded-lg text-red-500 hover:-translate-y-1 hover:scale-110 hover:bg-red-500 hover:text-white'>Thanh toán</button>
                    </td>
                  </tr>
                ))
              ) : (
                <p>Không tìm thấy nợ nào.</p>
              )} */}
            </tbody>
          </table>
        </CardBody>


      </Card>
    </div>
  )
}

export default ParentFinance