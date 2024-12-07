import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
    submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    attachments: [String], // URLs to uploaded files
    status: {
        type: String,
        enum: ["Đang chờ", "Đang xem xét", "Đã giải quyết"],
        default: "Đang chờ",
    },
    response: { type: String, default: "" }
}, { timestamps: true });
const Complaint = mongoose.model("Complaint", complaintSchema);
export default Complaint
