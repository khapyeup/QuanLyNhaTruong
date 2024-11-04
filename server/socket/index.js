import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import User from '../models/user.js';


const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true
    }
});

const onlineUsers = new Set();

io.on('connection', async (socket) => {
    console.log('User connected ', socket.id);

    //Find user detail from userId from auth.userId
    const userId = socket.handshake.auth.userId;
    const user = await User.findById(userId);
    
    //Create a room
    socket.join(user?._id);
    onlineUsers.add(user?._id.toString());
    console.log('set online to true user: ', user.username.toString())
    //Send online user array to client
    io.emit('onlineUsers', Array.from(onlineUsers));

    socket.on('load-receiverInfo',async (userId) => {
        const user = await User.findById(userId);
        
        const payload = {
            _id: user?._id.toString(),
            name: user?.teacherInfo.name,
            profile: user?.profile,
            online: onlineUsers.has(userId),
        }
        
        socket.emit('receiverInfo', payload);
    })

    //Disconnect
    socket.on('disconnect', () => {
        console.log('Disconnect user ', socket.id);
        onlineUsers.delete(user._id.toString());
        io.emit('onlineUsers', Array.from(onlineUsers));
        console.log('set online to false user: ', user.username)
    })
})

export {app, server}