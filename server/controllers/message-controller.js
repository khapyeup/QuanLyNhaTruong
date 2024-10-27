import Message from "../models/message.js";

//Create message
const createMessage = async (req, res) => {
    const { chatId, senderId, text } = req.body;

    const message = new Message({
        chatId, senderId, text
    });

    try {
        const response = await message.save();
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Có lỗi khi tạo tin nhắn" })
    }
}

//Get message
const getMessage = async(req, res) => {
    const {chatId} = req.params;

    try {
        const response = await Message.find({chatId});
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Có lỗi khi get tin nhắn" })
    }
}

export { createMessage, getMessage }