import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
    activity_name: {type: String, required: true}
})

const Activity = mongoose.model('Activity', activitySchema);
export default Activity;