'use strict';

var socket = io();

$(document).ready( function (){
    $("#chpoke").click( function(){
        socket.emit('message', {"message": "Chpoke!!!"});
        return false;
    });
});

