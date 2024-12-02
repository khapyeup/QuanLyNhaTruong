import mongoose from "mongoose";

const feeSchema = new mongoose.Schema({
    name: {type: String, required: true},
    baseFee: {type: Number, required: true},
    mealFee: {type:Number, required: true},
    transportFee: {type:Number, required: true},
    dueDate: {type: Date, required:true}
})

const Fee = mongoose.model("Fee", feeSchema);
export default Fee;