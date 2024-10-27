import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['admin', 'parent', 'teacher'] },
    student_id: [{type: mongoose.Schema.Types.ObjectId, ref: 'Student'}],
    class_id: [{type: mongoose.Schema.Types.ObjectId, ref: 'Class'}],
    contact_info: {
        father_email: {type: String, required: true},
        father_phone: {type: String, required: true},
        father_name: {type: String, required: true},
        father_cccd: {type: String, required: true},
        mother_name: {type: String, required: true},
        mother_phone: {type: String, required: true},
        mother_email: {type: String, required: true},
        mother_cccd: {type: String, required: true},
    }
})

const User = mongoose.model('User', userSchema);
export default User;