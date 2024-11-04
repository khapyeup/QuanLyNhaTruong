import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';


const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true
    }
});

io.on('connection', (socket) => {

    console.log('User connected with id: ', socket.id);


    //Disconnect
    io.on('disconnect', () => {
        console.log('Disconnect user ', socket.id);
    })
})

export {app, server}