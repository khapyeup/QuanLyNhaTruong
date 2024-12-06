import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

import User from "../models/user.js";
import Conversation from "../models/conversation.js";
import Message from "../models/message.js";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

const onlineUsers = new Set();

//Function update conversation
const getConversations = async (sender) => {
  const conversations = await Conversation.find({
    participants: { $in: [sender] },
  })
    .populate("participants")
    .populate("messages");

  let payload = conversations?.map((conversation) => {
    let index = conversation.participants[0]._id.toString() === sender ? 1 : 0;
    return {
      _id: conversation._id,
      name:
        conversation.participants[index]?.teacherInfo.name ||
        conversation.participants[index]?.parentInfo.fatherName,
      sender: conversation.participants[index]?._id,
      profile: conversation.participants[index]?.profile,
      lastMessage: conversation.messages[conversation.messages.length - 1],
      totalUnSeen: conversation.messages.filter(
        (message) =>
          message?.sender.toString() ===
          conversation.participants[index]?._id.toString() && !message?.seen
      )?.length,
    };
  });

  return payload;
};

io.on("connection", async (socket) => {
  console.log("User connected ", socket.id);

  //Find user detail from userId from auth.userId
  const userId = socket.handshake.auth.userId;

  const user = await User.findById(userId);

  //Create a room
  socket.join(user?._id.toString());
  //Add to onlineUser array
  onlineUsers.add(user?._id.toString());

  socket.on("getConversations", async (sender) => {
    let payload = await getConversations(sender);
    socket.emit("conversations", payload || []);
  });

  //Send online user array to client
  io.emit("onlineUsers", Array.from(onlineUsers));

  socket.on("load-receiverInfo", async (data) => {
    const user = await User.findById(data.receiver);

    const payload = {
      _id: user?._id.toString(),
      name: user?.teacherInfo.name || user?.parentInfo.fatherName,
      profile: user?.profile,
      online: onlineUsers.has(data.receiver),
    } || null;

    socket.emit("receiverInfo", payload);

    const conversation = await Conversation.findOne({
      participants: { $all: [user?._id, data.sender] },
    })
      .populate("messages")
      .sort({ updateAt: -1 });

    socket.emit("messages", conversation?.messages);
  });

  socket.on("send-message", async (message) => {
    //Find a conversation
    let conversation = await Conversation.findOne({
      participants: { $all: [message.sender, message.receiver] },
    });

    const newMessage = await Message.create(message);

    //If conversation doesnt have, create a new one
    if (!conversation) {
      const newConversation = new Conversation({
        participants: [message.sender, message.receiver],
      });
      conversation = await newConversation.save();
    }

    conversation.messages.push(newMessage._id);
    await conversation.save();

    const getMessages = await Conversation.findOne({
      participants: { $all: [message.sender, message.receiver] },
    })
      .populate("messages")
      .sort({ updateAt: -1 });

    //After sending message, update seen to true
    const updateSeen = await Message.updateMany(
      {
        sender: message.receiver,
        receiver: message.sender,
      },
      { seen: true }
    );

    //Send conversations after user send a messages
    let payloadSender = await getConversations(message.sender);
    let payloadReceiver = await getConversations(message.receiver);

    io.to([message.sender]).emit("conversations", payloadSender);
    io.to([message.receiver]).emit("conversations", payloadReceiver);
    io.to([message.sender, message.receiver]).emit(
      "messages",
      getMessages.messages
    );
  });

  //Disconnect
  socket.on("disconnect", () => {
    console.log("Disconnect user ", socket.id);
    onlineUsers.delete(user._id.toString());
    io.emit("onlineUsers", Array.from(onlineUsers));
  });
});

export { app, server };
