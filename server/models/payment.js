import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  fee: { type: mongoose.Types.ObjectId, ref: "Fee", },
  amount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["Chưa trả", "Đang trả", "Đã trả"],
    default: "Chưa trả",
  },
  balance: {type: Number},
  payment: [{
    paymentDate: {type: Date, default: Date.now()},
    amount: { type: Number, required: true},
    paymentMethod: {type: String, required: true}, 
    discount: {type: Number, default: 0}
  }],
  mealPlanEnabled: {type: Boolean, default: false},
  transportEnabled:{ type: Boolean, default: false},
});

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
