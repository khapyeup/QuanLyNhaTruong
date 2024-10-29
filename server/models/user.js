import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['admin', 'parent', 'teacher'] },
    parentInfo: {
        student_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
        class_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }],
        fatherEmail: { type: String, required: true },
        fatherPhone: { type: String, required: true },
        fatherName: { type: String, required: true },
        fatherPassport: { type: String, required: true },
        motherName: { type: String, required: true },
        motherPhone: { type: String, required: true },
        motherEmail: { type: String, required: true },
        motherPassport: { type: String, required: true },

    },
    teacherInfo: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        gender: { type: String, required: true, enum: ['Nam', 'Nữ'] },
        class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
        attendance: [{
            date: { type: Date },
            status: { type: String, enum: ['Vắng', 'Hiện diện'] }
        }],
    }
})

const User = mongoose.model('User', userSchema);
export default User;