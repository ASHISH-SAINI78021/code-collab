const express = require("express");
const http = require("http");
const {Server} = require("socket.io");
const ACTIONS = require("./helper/action.js");
const app = express();



const server = http.createServer(app);
const io = new Server(server);

const PORT = 5000;
const userSocketMap = {};
const getAllConnectedClients = (roomId)=> {

    // notes
    // io.sockets.adapter.rooms.get(roomId) -> it will return a hash map of connected users with socket id's
    // Array.from -> it will return an array

    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId)=> {
        return {
            socketId ,
            username : userSocketMap[socketId]
        }
    })
}
io.on("connection" , (socket)=> {
    console.log("socket-id" , socket.id);

    // it will listen the event from the frontend side
    socket.on(ACTIONS.JOIN , ({roomId , username})=> {
        userSocketMap[socket.id] = username;
        socket.join(roomId); // in this step we join the socket into the room

        const clients = getAllConnectedClients(roomId);
        // it will get all the clients list
        // console.log(clients);

        clients.forEach((socketId)=> {
            io.to(socketId).emit(ACTIONS.JOINED , {
                clients , username , 
                socketId : socket.id // we will send the socket id of current client joined to all members in client list
            })
        })
        
    })
});

server.listen(PORT , ()=> {
    console.log("connected to socket..");
});
