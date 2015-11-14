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
    let markCount = e.marks.reduce((prev, cur) => prev + cur, 0);
    var markTime = timestamp();
    
    obvChart.push([{time:markTime, y:getMark(e.marks[0], markCount)}]);
    goodChart.push([{time:markTime, y:getMark(e.marks[1], markCount)}]);
    acceptableChart.push([{time:markTime, y:getMark(e.marks[2], markCount)}]);
    sosoChart.push([{time:markTime, y:getMark(e.marks[3], markCount)}]);
    boredChart.push([{time:markTime, y:getMark(e.marks[4], markCount)}]);
    
});
socket.emit('message', 'foo');

