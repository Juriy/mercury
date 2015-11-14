'use strict';

let express = require('express');
let app = express();
let http = require('http').createServer(app);
let io = require('socket.io')(http);

app.use(express.static(__dirname + '/client'));

io.on('connection', onUserConnected);

http.listen(3000, () => {console.log('listening on *:3000');});

function onUserConnected(socket) {
    socket.on('disconnect', () => console.log('user disconnected'));
    socket.on('message', msg => io.emit('message', msg));
    socket.emit('message', 'welcome to server');
}