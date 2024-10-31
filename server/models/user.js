import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['admin', 'parent', 'teacher'] },
    profile: {type: String, required: true},
    parentInfo: {
        student_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
        sclass: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }],
        fatherEmail: { type: String },
        fatherPhone: { type: String},
        fatherName: { type: String},
        fatherPassport: { type: String },
        fatherAge: {type:String},
        motherName: { type: String},
        motherPhone: { type: String },
        motherEmail: { type: String },
        motherPassport: { type: String },
        motherAge: {type: String}
    },
    teacherInfo: {
        name: { type: String },
        activityAssign: {type:mongoose.Schema.Types.ObjectId, ref: 'Activity'},
        age: {type:String},
        email: { type: String},
        phone: { type: String},
        gender: { type: String, enum: ['Nam', 'Nữ'] },
        class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
        attendance: [{
            date: { type: Date },
            status: { type: String, enum: ['Vắng', 'Hiện diện'] }
        }],
    }
})

const User = mongoose.model('User', userSchema);
export default User;