import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: {type: String, required: true},
    phone: {type: String, required: true},
    gender: {type: String, required: true, enum: ['Nam', 'Nữ']},
    class_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Class'},
    attendance: [{
        date: {type: Date},
        status: {type: String, enum: ['Vắng', 'Hiện diện']}
    }],
})

const Teacher = mongoose.model('Teacher', teacherSchema);
export default Teacher;