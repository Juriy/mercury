'use strict';

var socket = io();
$('button').click(function(){
    socket.emit('mark', {
        mark: +$(this).attr('id').substr('5')
    });
});

