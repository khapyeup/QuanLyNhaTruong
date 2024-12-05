import { useParams } from "react-router-dom";
import {
  useAddSubPaymentMutation,
  useGetPaymentDetailQuery,
} from "../../../redux/paymentRelated/paymentApiSlice";
import Loading from "../../component/Loading";
import { format } from "date-fns";
import { IoMdAdd } from "react-icons/io";
import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function PaymentDetail() {
  const { studentId } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isOpen, setIsOpen] = useState(false);
  const [paymentId, setPaymentId] = useState("");

  const { data, isLoading, isError } = useGetPaymentDetailQuery(studentId);
  const [addSubPayment] = useAddSubPaymentMutation();

  const handleOpen = (id) => {
    setPaymentId(id);
    setIsOpen(!isOpen);
  };

  const submit = (data) => {
    data._id = paymentId;
    addSubPayment(data)
      .unwrap()
      .then((response) => toast.success(response.message))
      .finally(setIsOpen(false));
  };
  console.log(data);
  console.log(paymentId);
  return (
    <>
      <h1 className="font-bold text-2xl">Chi tiết giao dịch</h1>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <p>Có lỗi khi tải dữ liệu</p>
      ) : data.length === 0 ? (
        <p>Không có dữ liệu</p>
      ) : (
        <div className="py-10 flex flex-col gap-12">
          {/* Student Info */}
          <div className="bg-gray-200 p-4 rounded-xl">
            <h2 className="font-bold text-xl mb-4">Thông tin học sinh</h2>
            <div className="flex gap-16">
              <img
                src={data[0].studentId.avatar}
                className="size-28 rounded-full"
                alt="Ảnh đại diện"
              />
              <div className="grid grid-flow-row font-bold">
                <p>
                  Họ và tên:{" "}
                  <span className="font-thin">{data[0].studentId.name}</span>
                </p>
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
          {/* Payment Detail */}
          <div className="p-4 rounded-xl bg-gray-200">
            <h2 className="font-bold text-xl mb-4">Giao dịch</h2>
            <div className="flex flex-col gap-4">
              {data.map((item) => (
                <div key={item._id}>
                  <div
                    className={`flex justify-between ${
                      item.status === "Chưa trả"
                        ? `bg-red-400`
                        : item.status === "Đã trả" ? `bg-green-400` : item.status ==="Đang trả" && `bg-orange-400`
                    } text-white p-4 rounded-lg`}
                  >
                    <p>{item.fee.name}</p>

                    <p>
                      Ngày hết hạn: {format(item.fee.dueDate, "dd/MM/yyyy")}
                    </p>
                    <p>Tiền cần trả: {item.balance.toLocaleString()}</p>
                  </div>

                  <div>
                    <ul>
                      {item.payment.length == 0 ? (
                        <li>
                          Không có giao dịch nào gần đây. Bấm vào dấu cộng bên
                          dưới để thêm giao dịch
                        </li>
                      ) : (
                        <table className="w-full table-auto text-left">
                          <thead>
                            <tr>
                              <th className="p-4 border border-gray-400">Ngày thanh toán</th>
                              <th className="p-4 border border-gray-400">Tiền thanh toán</th>
                              <th className="p-4 border border-gray-400">Giảm giá</th>
                              <th className="p-4 border border-gray-400">Phương thức thanh toán</th>
                            </tr>
                          </thead>
                          <tbody>
                            {item.payment.map((payment) => (
                              <tr key={payment._id}>
                                <td className="p-4 border border-gray-400">
                                  {format(payment.paymentDate, "dd/MM/yyyy")}
                                </td>
                                <td className="text-green-500 p-4 border border-gray-400">{payment.amount.toLocaleString()}</td>
                                <td className="p-4 border border-gray-400">{payment.discount.toLocaleString()}</td>
                                <td className="p-4 border border-gray-400">{payment.paymentMethod}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                      {/* Button Add new payment */}
                      {(item.status === "Chưa trả" || item.status === "Đang trả") && (
                        <li>
                          <IoMdAdd
                            onClick={() => handleOpen(item._id)}
                            className="size-8 text-red-500 mx-auto cursor-pointer "
                          />
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <Dialog open={isOpen} handler={handleOpen}>
        <DialogHeader>Thêm giao dịch</DialogHeader>
        <DialogBody>
          <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-2">
            <label htmlFor="amount">Số tiền</label>
            <input
              {...register("amount")}
              required
              className="border border-gray-400 p-2 rounded-lg"
              id="amount"
              type="number"
              name="amount"
            />
            <label htmlFor="paymentMethod">Phương thức thanh toán</label>
            <select
              {...register("paymentMethod")}
              required
              className="border border-gray-400 p-2 rounded-lg"
              id="paymentMethod"
              name="paymentMethod"
            >
              <option value=""></option>
              <option value="Thẻ">Thẻ</option>
              <option value="Tiền mặt">Tiền mặt</option>
            </select>
            <label htmlFor="discount">Giảm giá</label>
            <input
              {...register("discount")}
              required
              className="border border-gray-400 p-2 rounded-lg"
              id="discount"
              type="number"
              name="discount"
            />
            <button className="p-2 rounded-full bg-black text-white">
              Thêm giao dịch
            </button>
          </form>
        </DialogBody>
      </Dialog>
    </>
  );
}
