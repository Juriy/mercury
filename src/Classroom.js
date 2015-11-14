'use strict';

let EventEmitter = require('events');

class Classroom extends EventEmitter {
    constructor() {
        super();
    }

    addMember(member) {
        this.emit('member-joined', {
            member: member
        });
    }
}

module.exports = Classroom;