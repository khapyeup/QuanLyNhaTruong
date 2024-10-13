import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    subject: { type: String, required: true },
    email: {type: String, required: true},
    phone: {type: String, required: true},
    class_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Class'}
})

const Teacher = mongoose.model('Teacher', teacherSchema);
export default Teacher;