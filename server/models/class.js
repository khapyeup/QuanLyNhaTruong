import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
    name: {type: String, required: true},
    schedule: [{
        day: {type: String},
        time: {type: String},
        subject: {type: String}
    }]
})

const Class = mongoose.model('Class', classSchema);
export default Class;