'use strict';

var socket = io();
$('button').click(function(){
    socket.emit('mark', {"mark": $(this).attr("id")});
});

socket.on('marks', (msg) => {console.log(msg.total);});

