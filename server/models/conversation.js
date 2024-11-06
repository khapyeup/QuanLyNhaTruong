import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
    {
        participants: [{
            type: mongoose.SchemaTypes.ObjectId, ref: 'User'
        }],
        messages: [
            { type: mongoose.SchemaTypes.ObjectId, ref: 'Message', required: true }
        ]
    },
    {
        timestamps: true
    }
);

const Conversation = mongoose.model('Conversation', conversationSchema);

export default Conversation;