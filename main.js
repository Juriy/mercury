'use strict';

let express = require('express');
let app = express();
let http = require('http').createServer(app);

let io = require('socket.io')(http);

var port = process.env.PORT || 3000;

let cors = require('cors');
let Classroom = require('./src/Classroom');

let classroom = new Classroom();
let count = 0;

app.use(cors());
app.use(express.static(__dirname + '/client'));

io.on('connection', onUserConnected);

app.get('/', (req, res) => {
    res.send("Server starting..." + port);

});

http.listen(port, () => {console.log('listening on *', port);});

function onUserConnected(socket) {
    let name = 'user' + ++count;

    classroom.addMember(name);
    socket.on('disconnect', () => classroom.removeMember(name));

    socket.on('message', msg => io.emit('message', msg));
    socket.on('mark', (e) => classroom.setMark(name, e.mark));
    socket.emit('message', 'welcome to server');

    console.log(name, 'connected');
}



setInterval(() => {
    io.emit('marks', classroom.getMarks());
}, 1000);
