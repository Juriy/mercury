'use strict';

var socket = io();
$('button').click(function(){
    socket.emit('message', {"message": $(this).attr("id")});
});

socket.on('message', (msg) => {console.log(msg.message);});

