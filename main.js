'use strict';

let express = require('express');
let app = express();
let http = require('http').createServer(app);
let io = require('socket.io')(http);
let cors = require('cors');

let Classroom = require('./src/Classroom');

let classroom = new Classroom();
let count = 0;

app.use(cors());
app.use(express.static(__dirname + '/client'));

io.on('connection', onUserConnected);

http.listen(3000, () => {console.log('listening on *:3000');});

function onUserConnected(socket) {
    let me = {
        name: 'user' + ++count
    };

    console.log(me.name, 'connected');
    classroom.addMember(me);
    socket.on('disconnect', () => classroom.removeMember(me));

    socket.on('message', msg => io.emit('message', msg));
    socket.on('mark', (e) => classroom.setMark(me.name, e.mark));
    socket.emit('message', 'welcome to server');
}



setInterval(() => {
    io.emit('marks', classroom.getMarks());
}, 1000);