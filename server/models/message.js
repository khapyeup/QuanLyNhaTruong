import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        sender: { type: mongoose.Types.ObjectId, ref: 'User' },
        receiver: { type: mongoose.Types.ObjectId, ref: 'User' },
        text: { type: String, default: '' },
        imageUrl: { type: String, default: '' },
        fileUrl: { type: String, default: '' },
        seen: { type: Boolean, default: false }
    },
    {
        timestamps: true
    }
);

const Message = mongoose.model('Message', messageSchema);

export default Message;