import { Link, useParams } from "react-router-dom";
import {
  useCreateOrderMutation,
  useGetPaymentDetailQuery,
} from "../../redux/paymentRelated/paymentApiSlice";
import Loading from "../component/Loading";
import { format } from "date-fns";
import { FaMoneyBillAlt } from "react-icons/fa";
import { FaRegCreditCard } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentDetail() {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetPaymentDetailQuery(studentId);
  const [createOrder] = useCreateOrderMutation();

  //Total paid
  const paidAmount =
    (data &&
      data
        .filter((item) => item.status !== "Chưa trả")
        .reduce((prev, curr) => {
          return curr.payment.reduce((pre, cur) => cur.amount + pre, 0) + prev;
        }, 0)) ||
    0;
  const notPaidAmount =
    (data && data.reduce((pre, curr) => curr.balance + pre, 0)) || 0;

  function handleClickPayment(fee) {
    const data = { feeName: fee.fee.name, price: fee.balance };
    
    createOrder(data)
      .unwrap()
      .then((res) => {window.open(res.orderurl, "_blank")});
  }

  return (
    <div className=" p-10 flex flex-col gap-6">
      <h1 className="font-bold text-2xl flex flex-row gap-2 items-center">
        <Link to="/parent/payments">
          <FaArrowLeftLong className="hover:text-red-800" />
        </Link>
        Chi tiết giao dịch
      </h1>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <p>Có lỗi khi tải dữ liệu</p>
      ) : data.length === 0 ? (
        <p>Không có dữ liệu</p>
      ) : (
        <div className="flex flex-col gap-6 ">
          {/* Student Info */}
          <div className="p-4 rounded-lg shadow-md border">
            <div className="flex gap-16 md:flex-row flex-col">
              <img
                src={data[0].studentId.avatar}
                className="size-28 rounded-full"
                alt="Ảnh đại diện"
              />
              <div className="grid grid-flow-row font-bold">
                <p className="font-bold text-xl">{data[0].studentId.name}</p>
                <p>
                  Lớp:{" "}
                  <span className="font-thin">
                    {data[0].studentId.class_id.name}
                  </span>
                </p>
                <p>
                  Ngày sinh:{" "}
                  <span className="font-thin">{data[0].studentId.dob}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Payment History */}
          <div className="p-4 rounded-lg shadow-md border">
            <h1 className="font-bold text-xl mb-4">Lịch sử giao dịch</h1>
            <div className="flex flex-col gap-4">
              {data.map((item) => (
                <div key={item._id}>
                  <div
                    className={`flex flex-wrap justify-between ${
                      item.status === "Chưa trả"
                        ? `bg-red-400`
                        : item.status === "Đã trả"
                        ? `bg-green-400`
                        : item.status === "Đang trả" && `bg-orange-400`
                    } text-white p-2 rounded-lg`}
                  >
                    <p>{item.fee.name}</p>

                    <p>
                      Ngày hết hạn: {format(item.fee.dueDate, "dd/MM/yyyy")}
                    </p>
                    <p>Tổng học phí: {item.amount.toLocaleString()}</p>
                    <p>Học phí chưa trả: {item.balance.toLocaleString()}</p>
                    <button
                      onClick={() => handleClickPayment(item)}
                      className="border border-black hover:bg-gray-400 px-2 rounded-lg"
                    >
                      $ Thanh toán
                    </button>
                  </div>

                  <div>
                    <ul>
                      {item.payment.length == 0 ? (
                        <li className="p-4">Không có giao dịch nào gần đây.</li>
                      ) : (
                        <table className="w-full table-auto text-left">
                          <thead>
                            <tr>
                              <th className="p-4 border-b border-gray-400">
                                Ngày thanh toán
                              </th>
                              <th className="p-4 border-b border-gray-400">
                                Tiền thanh toán
                              </th>
                              <th className="p-4 border-b border-gray-400">
                                Giảm giá
                              </th>
                              <th className="p-4 border-b border-gray-400">
                                Phương thức thanh toán
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {item.payment.map((payment, index) => (
                              <tr key={index}>
                                <td className="p-4 border-b border-gray-300">
                                  {format(payment.paymentDate, "dd/MM/yyyy")}
                                </td>
                                <td className="p-4 border-b border-gray-300">
                                  {payment.amount.toLocaleString()} VNĐ
                                </td>
                                <td className="p-4 border-b border-gray-300">
                                  {payment.discount.toLocaleString()} VNĐ
                                </td>
                                <td className="p-4 border-b border-gray-300 flex gap-1 items-center flex-row">
                                  {payment.paymentMethod === "Tiền mặt" ? (
                                    <FaMoneyBillAlt className="size-8" />
                                  ) : (
                                    <FaRegCreditCard className="size-8" />
                                  )}{" "}
                                  {payment.paymentMethod}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/*Payment Total*/}
          <div className="grid grid-cols-2 gap-4">
            <div className="shadow-md p-4 border  rounded-lg flex gap-4 flex-col">
              <h2 className="text-2xl">Tổng tiền đã thanh toán</h2>
              <span className="text-green-500 text-xl font-bold">
                {paidAmount.toLocaleString()} VNĐ
              </span>
            </div>
            <div className="shadow-md p-4 border  rounded-lg flex gap-4 flex-col">
              <h2 className="text-2xl">Tổng tiền chưa thanh toán</h2>
              <span className="text-red-500 text-xl font-bold">
                {notPaidAmount.toLocaleString()} VNĐ
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
