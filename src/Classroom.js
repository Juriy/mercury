'use strict';

let EventEmitter = require('events');

class Classroom extends EventEmitter {
    constructor() {
        super();
        this._members = new Map();
    }

    addMember(member) {
        this._members.set(member.name, member);
        this.emit('member-joined', {
            member: member,
            memberCount: this._members.size
        });
    }

    setMark(name, mark) {
        let member = this._members.get(name);
        member.mark = mark;
        this.emit('mark', {
            member: member,
            mark: mark
        });
    }
}

module.exports = Classroom;