/**
 * Created by Nick on 14.11.2015.
 */
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var app = express();

app.use(express.static(__dirname + '/client'));

app.get('/', function (req, res) {
    res.send('Hello World!');
});


app.get('/aud', function (req, res) {
    res.sendFile('aud.html');
});


var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at', host, port);
});

io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on('message', function(msg){
        console.log('message: ' + msg.message);
    });
});