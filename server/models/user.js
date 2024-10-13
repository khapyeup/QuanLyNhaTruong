import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['admin', 'parent'] },
    student_id: [{type: mongoose.Schema.Types.ObjectId, ref: 'Student'}],
    contact_info: {
        email: {type: String},
        phone: {type: String},
        name: {type: String}
    }
})

const User = mongoose.model('User', userSchema);
export default User;