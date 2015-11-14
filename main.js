'use strict';

let express = require('express');
let app = express();
let http = require('http').createServer(app);
let io = require('socket.io')(http);

var port = process.env.PORT || 3000;

io.configure(function () {
    io.set("transports", ["xhr-polling"]);
    io.set("polling duration", 10);
});

app.use(express.static(__dirname + '/client'));

io.on('connection', onUserConnected);

app.get('/', (req, res) => {
    res.send("Server starting..." + port);

});

app.listen(port, () => {console.log('listening on *', port);});

function onUserConnected(socket) {
    socket.on('disconnect', () => console.log('user disconnected'));
    socket.on('message', msg => io.emit('message', msg));
    socket.emit('message', 'welcome to server');
}