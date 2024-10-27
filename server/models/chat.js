import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
    {
        members: [{type: mongoose.SchemaTypes.ObjectId, ref: 'User'}],
    },
    {
        timestamps: true
    }
);

const chatModel = mongoose.model('Chat', chatSchema);

export default chatModel;