import Chat from '../models/chat.js'


//Create chat
const createChat = async (req, res) => {
    const { firstId, secondId } = req.body;

    try {
        const chat = await Chat.findOne({
            members: { $all: [firstId, secondId] }
        })

        if (chat) return res.status(200).json(chat);

        const newChat = new Chat({
            members: [firstId, secondId]
        });

        const response = await newChat.save();

        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Có lỗi khi tạo chat" })
    }
}

//Get all chat
const findUserChat = async (req, res) => {
    const { userId } = req.params;

    try {
        const chats = await Chat.find({
            members: { $in: [userId] }
        }).populate("members");
       
        res.status(200).json(chats);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Có lỗi khi tìm chat" })
    }
}

//Find chat
const findChat = async (req, res) => {
    const { firstId, secondId } = req.params;

    try {
        const chat = await Chat.findOne({
            members: { $all: [firstId, secondId] }
        })

        res.status(200).json(chat);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Có lỗi khi tìm chat" })
    }
}

export {createChat, findUserChat, findChat}