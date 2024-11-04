import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
    {
        sender: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true },
        receiver: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true },
        messages: [
            { type: mongoose.SchemaTypes.ObjectId, ref: 'Message', required: true }
        ]
    },
    {
        timestamps: true
    }
);

const conversationModel = mongoose.model('Conversation', conversationSchema);

export default conversationModel;