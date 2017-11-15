const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New User connected');


    // socket .emit from admin text Welcome to the chat app

    // socket.emit('newMessage', {
    //     from: 'Admin',
    //     text: 'Welcome to the Chat App',
    //     createdAt: new Date().getTime()
    // });
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));


    // socket.broadcast.emit form the admin text new user joined.

    // socket.broadcast.emit('newMessage', {
    //     from:'Admin',
    //     text:'New user joined',
    //     createdAt: new Date().getTime()
    // });
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined'));

    // // to user from a user

    socket.on('createMessage',(message)=> {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
    });
    // socket.on('createMessage', (message) => {
    //  console.log('createMessage', message);
    //  io.emit('newMessage', {
    //      from: message.from,
    //      text: message.text,
    //      createdAt: new Date().getTime()
    //  });
    // });

socket.on('disconnect',() =>{
    console.log('User was disconnected')
})
});

server.listen(3000, () => {
    console.log('Server is up on port 3000');
}); 