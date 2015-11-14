/**
 * Created by Nick on 14.11.2015.
 */
var express = require('express');
var io = require('socket.io');
var app = express();

app.get('/', function(req, res){
    res.sendFile(__dirname + '/cient/index.html');
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});

io.sockets.on('connection', function (socket) {
    // �.�. ��� ������� - � �������� ����� ���� ���������� ������ 5 �������� �� ID ������
    var ID = (socket.id).toString().substr(0, 5);
    var time = (new Date).toLocaleTimeString();
    // �������� ������� ��������� � ���, ��� �� ������� ����������� � ��� ���
    socket.json.send({'event': 'connected', 'name': ID, 'time': time});
    // �������� ���� ��������� �������������, ��� ����������� ����� ������ � ��� ���
    socket.broadcast.json.send({'event': 'userJoined', 'name': ID, 'time': time});
    // ���������� ���������� �� �������� ���������
    socket.on('message', function (msg) {
        var time = (new Date).toLocaleTimeString();
        // ���������� �������, ��� ��� ��������� ������� ����� �� �������
        socket.json.send({'event': 'messageSent', 'name': ID, 'text': msg, 'time': time});
        // �������� ��������� ��������� ���������� ����
        socket.broadcast.json.send({'event': 'messageReceived', 'name': ID, 'text': msg, 'time': time})
    });
    // ��� ���������� ������� - ���������� ���������
    socket.on('disconnect', function() {
        var time = (new Date).toLocaleTimeString();
        io.sockets.json.send({'event': 'userSplit', 'name': ID, 'time': time});
    });
});