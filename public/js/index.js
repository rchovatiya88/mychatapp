var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
    
socket.emit ('createMessage', {
        from:'ronak',
        text: 'yup, that was me'
    });
});



socket.on('disconnect',function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message){
    console.log ('newMessage', message);
})