import Conversation from '../models/conversation.js';
import Message from '../models/message.js';

export const getMessages = async (req, res) => {
    try {
        const { sender, receiver } = req.params;

        const conversation = await Conversation.findOne({
            participants: { $all: [receiver, sender] }
        }).populate('messages');

        if (!conversation) {
            return res.json([]);
        }

        return res.json(conversation.messages);
    } catch (error) {
        console.log('Error at chat-controller: ', error);
        res.json({ error: 'Internal error server!' });
    }
}

export const newMessage = async (req, res) => {
    try {
        const { sender, receiver, text, imageUrl, fileUrl, seen } = req.body;

        //Find a conversation
        const conversation = await Conversation.findOne({
            participants: { $all: [sender, receiver] }
        }).populate('messages');

        const newMessage = await Message.create({
            sender, receiver, text, imageUrl, fileUrl, seen
        })

        //If conversation doesnt have, create a new one
        if (!conversation) {
            const newConversation = new Conversation({
                participants: [sender, receiver],
                messages: [newMessage._id]
            })
            const conversation = await newConversation.save();
            return res.json(conversation);
        }

        conversation.messages.push(newMessage._id);
        conversation.save();

        return res.json(conversation);

    } catch (error) {
        console.log('Error at chat-controller: ', error);
        res.json({ error: 'Internal error server!' });
    }
}

export const getConversations = async (req, res) => {
    try {
        const { sender } = req.params;
        
        const conversations = await Conversation.find({
            participants: { $in: [sender] }
        }).populate('participants');
        
        res.json(conversations);
    } catch (error) {
        console.log('Error at chat-controller: ', error);
        res.json({ error: 'Internal error server!' });
    }

}