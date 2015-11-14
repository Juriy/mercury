'use strict';

var socket = io();
socket.on('message', () => {console.log(msg);});
socket.emit('message', 'foo');