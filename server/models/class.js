import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
    name: { type: String, required: true },
    schedule: [{
        weekStart: { type: String },
        weekEnd: { type: String},
        content: [{
            day: { type: String },
            periods: [{
                startTime: { type: String },
                endTime: { type: String },
                groupActivity: { type: mongoose.Schema.Types.ObjectId, ref: 'Activity' },
                activity: {type: String}
            }]
        }]
    }]
})

const Class = mongoose.model('Class', classSchema);

export default Class;