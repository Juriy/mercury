'use strict';

var socket = io();
$("#chpoke").click( function(){
    socket.emit('message', {"message": "Chpoke!!!"});
    return false;
});

socket.on('message', (msg) => {console.log(msg);});
socket.emit('message', 'foo');
