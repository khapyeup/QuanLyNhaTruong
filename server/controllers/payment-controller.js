import Fee from "../models/fee.js";
import Payment from "../models/payment.js";
import Remind from "../models/remind.js";
import User from "../models/user.js";
import { addTeacher } from "./teacher-controller.js";
import moment from "moment";
import { v1 as uuid } from "uuid";
import CryptoJS from "crypto-js";
import axios from "axios";

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

    const payments = await Payment.find({ studentId })
      .populate({
        path: "studentId",
        select: ["class_id", "name", "dob", "avatar"],
        populate: { path: "class_id", select: "name" },
      })
      .populate("fee");
    res.json(payments);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Có lỗi ở phía máy chủ" });
  }
};

const addSubPayment = async (req, res) => {
  try {
    const data = req.body;
    const payment = await Payment.findById(data._id);
    if (!payment) {
      return res.status(500).json({ message: "Không tìm thấy dữ liệu" });
    }

    // Convert strings to numbers and store them
    const amount = Number(data.amount) || 0; // || 0 handles null/undefined cases
    const discount = Number(data.discount) || 0;

    if (amount > payment.balance || amount + discount > payment.balance)
      return res.status(500).json({
        message:
          "Số tiền thanh toán không được lớn hơn số tiền chưa thanh toán",
      });
    else if (amount <= 0 || discount < 0)
      return res.status(500).json({ message: "Dữ liệu nhập vào không hợp lệ" });
    if (discount > payment.balance)
      return res.status(500).json({
        message:
          "Số tiền giảm giá nhập vào không được lớn hơn số tiền chưa thanh toán",
      });

    payment.balance -= amount + discount;
    if (payment.balance === 0) {
      payment.status = "Đã trả";
    } else {
      payment.status = "Đang trả";
    }
    payment.payment.push(data);
    await payment.save();
    res.json({ message: "Đã thêm giao dịch thành công!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Có lỗi ở phía máy chủ" });
  }
};

const getNofiticationPayment = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch reminder settings
    const remindSetting = await Remind.findOne();
    if (!remindSetting.isActive) return res.status(200).json([]);

    const alertDays = remindSetting ? remindSetting.alertDays : 2;

    const today = new Date();
    const alertDate = new Date(today);
    alertDate.setDate(today.getDate() + alertDays);

    // Find user by userId
    const user = await User.findById(userId).populate({
      path: "parentInfo.student_id",
      select: "name",
    });

    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy user!" });
    }

    const studentIds = user.parentInfo.student_id.map((student) => student._id);

    // Find all payments related to the user’s students
    const payments = await Payment.find({
      studentId: { $in: studentIds },
      status: { $in: ["Đang trả", "Chưa trả"] },
    })
      .populate("studentId", "name")
      .populate("fee", "name dueDate");

    // Generate notifications for payments
    const notifications = payments
      .filter((payment) => new Date(payment.fee.dueDate) <= alertDate) // Check if due date is within alert days
      .map(
        (payment) =>
          `Hạn nộp ${payment.fee.name} của bé ${payment.studentId.name} gần tới.`
      );

    res.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Đã xảy ra lỗi khi lấy thông báo!" });
  }
};

const paymentCreateOrder = async (req, res) => {
  const { feeName, price, } = req.body;

  // APP INFO
  const config = {
    appid: "554",
    key1: "8NdU5pG5R2spGHGhyO99HN1OhD8IQJBn",
    key2: "uUfsWgfLkRLzq6W2uNXTCxrfxs51auny",
    endpoint: "https://sandbox.zalopay.com.vn/v001/tpe/createorder",
  };

  const embeddata = {};

  const items = [
    {
      itemid: "knb",
      itemname: "Thanh toán học phí",
      itemprice: price,
      itemquantity: 1,
    },
  ];

  //Tao don hang
  const order = {
    appid: config.appid,
    apptransid: `${moment().format("YYMMDD")}_${uuid()}`, // mã giao dich có định dạng yyMMdd_xxxx
    appuser: "user1",
    apptime: Date.now(), // miliseconds
    item: JSON.stringify(items),
    embeddata: JSON.stringify(embeddata),
    amount: price,
    description: feeName,
    bankcode: "",
  };
  //Tao thong tin chung thuc
  // appid|apptransid|appuser|amount|apptime|embeddata|item
  const data =
    config.appid +
    "|" +
    order.apptransid +
    "|" +
    order.appuser +
    "|" +
    order.amount +
    "|" +
    order.apptime +
    "|" +
    order.embeddata +
    "|" +
    order.item;
  order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

  const result = await axios.post(config.endpoint, null, { params: order });
  if (result.data.returncode !== 1) {
    return res.status(500).json({ message: "Có lỗi khi tạo mã thanh toán" });
  }
  return res.json({orderurl: result.data.orderurl});
};

export {
  getPaymentDetail,
  assignPaymentToClass,
  addSubPayment,
  getNofiticationPayment,
  paymentCreateOrder,
};
