'use strict';

let EventEmitter = require('events');

class Classroom extends EventEmitter {
    constructor() {
        super();
        this._members = new Map();
    }

    addMember(member) {
        member.mark = Classroom.GOOD;
        this._members.set(member.name, member);
        this.emit('member-joined', {
            member: member,
            memberCount: this._members.size
        });
    }

    removeMember(member) {
        this._members.delete(member.name);
    }

    setMark(name, mark) {
        let member = this._members.get(name);
        member.mark = mark;
        this.emit('mark', {
            member: member,
            mark: mark
        });
    }

    getMarks() {
        let marks = [0, 0, 0, 0, 0];

        for (let member of this._members.values()) {
            marks[member.mark]++;
        }

        return {
            total: this._members.size,
            marks: marks
        };
    }
}

Classroom.TOO_OBVIOUS = 0;
Classroom.GOOD = 1;
Classroom.CHALLENGING = 2;
Classroom.TOO_HARD = 3;
Classroom.I_AM_LOST = 4;

exports = module.exports = Classroom;