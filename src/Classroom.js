'use strict';

let EventEmitter = require('events');

class Classroom extends EventEmitter {
    constructor() {
        super();
    }
}

module.exports = Classroom;