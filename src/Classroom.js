'use strict';

let EventEmitter = require('events');

class Classroom extends EventEmitter {
    constructor() {
        super();
        this._members = [];
    }

    addMember(member) {
        this._members.push(member);
        this.emit('member-joined', {
            member: member,
            memberCount: this._members.length
        });
    }
}

module.exports = Classroom;