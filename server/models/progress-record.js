import mongoose from "mongoose";

const progressRecord = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  date: { type: Date, default: Date.now },
  category: {
    type: String,
    enum: ["Nhận thức", "Giao tiếp", "Cảm xúc", "Ngôn ngữ", "Thể chất"],
    required: true,
  },
  observation: String,
  evidence: [
    {
      url: String,
      description: String,
      uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  teacherNotes: String,
  parentFeedback: String,
  seen: {type: Boolean, default: false}
});

const ProgressRecord = mongoose.model("ProgressRecord", progressRecord);
export default ProgressRecord;