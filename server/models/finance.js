import mongoose from "mongoose";

const financeSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    totalFees: { type: Number, required: true },
    feesPaid: { type: Number, default: 0 },
    outstandingFees: { type: Number },
    dueDate: { type: Date, required: true }
})

financeSchema.pre('save', function (next) {
    this.outstandingFees = this.totalFees - this.feesPaid;
    next();
});

const Finance = mongoose.model('Finance', financeSchema);
export default Finance;