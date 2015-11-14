'use strict';

let http = require('http').createServer();
let io = require('socket.io')(http);
let Classroom = require('./src/Classroom');

http.listen(8080, () => console.log('listening on *:' + port));

io.on('connection', onUserConnected);

function onUserConnected(socket) {
    socket.on('disconnect', () => console.log('user disconnected'));
    socket.on('message', msg => io.emit('message', msg));
    socket.emit('message', 'welcome to server');
}