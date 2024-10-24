import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    student_id: {type: String, unique: true, maxLength: 12},
    name: {type: String, required: true},
    dob: {type: String, required: true},
    class_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Class'},
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    attendance: [{
        date: {type: Date},
        status: {type: String, enum: ['Vắng', 'Hiện diện']}
    }],
    gender: {type: String, enum: ['Nam', 'Nữ']},
    address: {type: String},
    behaviour: [{
        title: {type: String},
        date: {type: Date}
    }],
    avatar: {type: String, required: true}
})

const Student = mongoose.model('Student', studentSchema);
export default Student;