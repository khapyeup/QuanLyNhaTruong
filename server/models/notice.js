import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    date: {type: Date, default: Date.now}
})

const Notice = mongoose.model('Notice', noticeSchema);
export default Notice;