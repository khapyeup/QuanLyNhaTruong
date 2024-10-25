import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
    [{
        group_activity: { type: String, required: true},
        activity: [{
            name: { type: String, required: true }
        }
        ]
    }]
)

const Activity = mongoose.model('Activity', activitySchema);
export default Activity;