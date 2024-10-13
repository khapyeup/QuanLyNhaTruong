import mongoose from "mongoose";

const financeSchema = new mongoose.Schema({
    type: {type: String},
    amount: {type: Number},
    due: {type: Date},
    description: {type: String},
    student_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Student'},
    status: {type: String, enum: ['Chưa trả', 'Đã trả']}
})

const Finance = mongoose.model('Finance', financeSchema);
export default Finance;