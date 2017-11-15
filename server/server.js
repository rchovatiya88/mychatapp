const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage , generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New User connected');

    // socket .emit from admin text Welcome to the chat app
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    // socket.broadcast.emit form the admin text new user joined.
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined'));
    // to user from a user
    socket.on('createMessage',(message, callback)=> {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from the server');
    
    });


    socket.on('createLocationMessage', (coords)=> {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

socket.on('disconnect',() =>{
    console.log('User was disconnected')
});
});

server.listen(3000, () => {
    console.log('Server is up on port 3000');
}); 