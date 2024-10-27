import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    financeRecord: { type: mongoose.Schema.Types.ObjectId, ref: 'Finance', required: true },
    paymentDate: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, required: true }
});

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;