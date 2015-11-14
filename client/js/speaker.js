'use strict';

var socket = io();
socket.on('message', (msg) => {console.log(msg);});
socket.on('marks', (e) => console.log('total', e.total, 'votes', e.marks));
socket.emit('message', 'foo');