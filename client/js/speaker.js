'use strict';


function timestamp() { return (new Date).getTime() / 1000; }

function getMark(value, total) {
    return (value/total) *100;
}

var obvi = [ { label: "Layer 1", values : []}];
var good = [{ label: "Layer 1", values : []}], acceptable = [{ label: "Layer 1", values : []}], soso =[{ label: "Layer 1", values : []}], bored=[{ label: "Layer 1", values : []}];

var socket = io();
socket.on('message', (msg) => {console.log(msg);});
socket.on('marks', (e) =>  {
    console.log(Date.now(), 'total', e.total, 'votes', e.marks);
    
    var markTime = timestamp();
    
    obvChart.push([{time:markTime, y:getMark(e.marks[0], e.total)}]);
    goodChart.push([{time:markTime, y:getMark(e.marks[1], e.total)}]);
    acceptableChart.push([{time:markTime, y:getMark(e.marks[2], e.total)}]);
    sosoChart.push([{time:markTime, y:getMark(e.marks[3], e.total)}]);
    boredChart.push([{time:markTime, y:getMark(e.marks[4], e.total)}]);
    
});
socket.emit('message', 'foo');

