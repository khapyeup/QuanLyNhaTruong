import Fee from "../models/fee.js";
import Payment from "../models/payment.js";
import { addTeacher } from "./teacher-controller.js";

const assignPaymentToClass = async (req, res) => {
  try {
    const feeArray = req.body;
    console.log(feeArray);
    const paymentPromise = feeArray.forEach(async (fee) => {
      //Get fee details
      const feeDetails = await Fee.findById(fee.feeId);
      if (!feeDetails)
        return res.status(500).json({ message: "Không tìm thấy dữ liệu" });

      const payment = fee.students.map(async (student) => {
        //Kiem tra hoc sinh da gan fee nay chua
        const existingPayment = await Payment.findOne({
          fee: fee.feeId,
          studentId: student.studentId,
        });
        if (!existingPayment) {
          //Tinh tong phi
          let totalFee = feeDetails.baseFee;
          if (student.mealFee) totalFee += feeDetails.mealFee;
          if (student.transportFee) totalFee += feeDetails.transportFee;

          return new Payment({
            studentId: student.studentId,
            fee: fee.feeId,
            amount: totalFee,
            balance: totalFee,
            status: "Chưa trả",
            mealPlanEnabled: student.mealFee,
            transportEnabled: student.transportFee,
          }).save();
        }
        return existingPayment;
      });
      await Promise.all(payment).length;
    });

    res.json({ message: `Đã gán phí thành công` });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Có lỗi ở phía máy chủ" });
  }
};

const getPaymentDetail = async (req, res) => {
  try {
    const { studentId } = req.params;

    const payments = await Payment.find({ studentId}).populate({
      path: "studentId",
      select: ['class_id','name', 'dob', "avatar"],
      populate: { path: "class_id", select: "name"}
    }).populate("fee");
    res.json(payments);
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: "Có lỗi ở phía máy chủ" });
  }
};

const addSubPayment = async (req, res) => {
  try {
    const data = req.body;
    const payment = await Payment.findById(data._id);
    if (!payment) {
      return res.status(500).json({message: "Không tìm thấy dữ liệu"})
    }
    
     // Convert strings to numbers and store them
     const amount = Number(data.amount) || 0;  // || 0 handles null/undefined cases
     const discount = Number(data.discount) || 0;
    
    if (amount > payment.balance || amount + discount > payment.balance)
      return res.status(500).json({message: "Số tiền thanh toán không được lớn hơn số tiền chưa thanh toán"})
    else if (amount <= 0 || discount <0)
      return res.status(500).json({message: "Dữ liệu nhập vào không hợp lệ"})
    if (discount > payment.balance)
      return res.status(500).json({message: "Số tiền giảm giá nhập vào không được lớn hơn số tiền chưa thanh toán"})
    
    payment.balance -= amount + discount
    if (payment.balance === 0) {
      payment.status = "Đã trả"
    } else {
      payment.status = "Đang trả"
    }
    payment.payment.push(
      data
    )
    await payment.save();
    res.json({message: "Đã thêm giao dịch thành công!"})
   

  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: "Có lỗi ở phía máy chủ"})
  }
}

export { getPaymentDetail, assignPaymentToClass, addSubPayment };
