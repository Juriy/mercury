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
        let memberJack = {name: 'Jack'};
        let memberJill = {name: 'Jill'};

        beforeEach(function() {
            cr = new Classroom();
        });

        it('should report the joined member', (done) => {
            cr.on('member-joined', (e) => {
                assert.equal('Jack', e.member.name);
                done();
            });

            cr.addMember(memberJack);
        });

        it('should increase member count on join', (done) => {
            cr.addMember(memberJack);

            cr.on('member-joined', (e) => {
                assert.equal(2, e.memberCount);
                done();
            });

            cr.addMember(memberJill);
        });

    })
});