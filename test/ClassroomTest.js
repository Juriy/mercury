'use strict';

let assert = require('assert');
let Classroom = require('../src/Classroom');

describe('Classroom', () => {

    describe('#constructor', () => {
        it('should construct objects', () => {
            let cr = new Classroom();
        });

        it('should act as a listener', (done) => {
            let cr = new Classroom();
            cr.on('foo', (e)=> {
                assert.equal(e, 1);
                done();
            });

            cr.emit('foo', 1);
        });
    });


    describe('#addMember', () => {
        let cr = null;

        beforeEach(function() {
            cr = new Classroom();
        });

        it('should report the joined member', (done) => {
            cr.on('member-joined', (e) => {
                assert.equal('Jack', e.member);
                done();
            });

            cr.addMember('Jack');
        });

        it('should increase member count on join', (done) => {
            cr.addMember('Jack');

            cr.on('member-joined', (e) => {
                assert.equal(2, e.memberCount);
                done();
            });

            cr.addMember('Jill');
        });

        it('should report new mark', (done) => {
            cr.on('mark', (e) => {
                assert.equal(2, e.mark);
                done();
            });

            cr.addMember('Jack');
            cr.setMark('Jack', 2);
        });
    });

    describe('mark count', () => {
        it('by default, no mark', () => {
            let cr = new Classroom();
            cr.addMember('Jack');
            cr.addMember('Jill');
            let state = cr.getMarks();
            assert.equal([0, 0, 0, 0, 0].toString(), state.marks.toString());
            assert.equal(2, state.total);
        });

        it('Marks are changing', () => {
            let cr = new Classroom();
            cr.addMember('Jack');
            cr.addMember('Jill');
            cr.setMark('Jack', Classroom.TOO_OBVIOUS);

            let state = cr.getMarks();
            assert.equal([1, 0, 0, 0, 0].toString(), state.marks.toString());
            assert.equal(2, state.total);
        });

        it('Removing user removes his marks', () => {
            let cr = new Classroom();
            cr.addMember('Jack');
            cr.addMember('Jill');
            cr.setMark('Jack', Classroom.GOOD);
            cr.setMark('Jill', Classroom.TOO_OBVIOUS);
            cr.removeMember('Jill');

            let state = cr.getMarks();
            assert.equal([0, 1, 0, 0, 0].toString(), state.marks.toString());
            assert.equal(1, state.total);
        });
    });
});