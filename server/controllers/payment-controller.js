import Fee from "../models/fee.js";
import Payment from "../models/payment.js";

const assignPaymentToClass = async (req, res) => {
  try {
    const feeArray = req.body;
    console.log(feeArray)
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
            transportEnabled: student.transportFee
          }).save()
        }
        return existingPayment;
      });
      await Promise.all(payment).length
    });
    
    res.json({message: `Đã gán phí thành công`})
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message: "Có lỗi ở phía máy chủ"})
  }
};

export { assignPaymentToClass };
