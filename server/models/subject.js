import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
    subject_name: {type: String, required: true}
})

const Subject = mongoose.model('Subject', subjectSchema);
export default Subject;