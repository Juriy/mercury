'use strict';


function timestamp() {
    return (new Date).getTime() / 1000;
}

function getMark(value, total) {
    return (value/total) *100;
}

function initCharts(...chartIds) {
    return  chartIds.map((id) => {
        return $(id).epoch({
            type:  'time.area',
            data:  [ { label: 'Layer 1', values : []}],
            axes:  ['left', 'bottom'],
            range: [0, 100],
            historySize: 240
        });
    });
}

let charts = initCharts('#obvChart', '#goodChart',
    '#acceptableChart', '#sosoChart', '#boredChart');

var socket = io();
socket.on('message', (msg) => {console.log(msg);});
socket.on('marks', (e) =>  {
    console.log(Date.now(), 'total', e.total, 'votes', e.marks);
    let markCount = e.marks.reduce((prev, cur) => prev + cur, 0);
    let markTime = timestamp();

    charts.forEach((it, i) => {
       it.push([{time:markTime, y:getMark(e.marks[i], markCount)}]);
    });

});
