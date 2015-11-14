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
        before(function() {
            cr = new Classroom();
        });

        it('should report the joined member', (done) => {
            let member = {name: 'Jack'};
            cr.on('member-joined', (e) => {
                assert.equal('Jack', e.member.name);
                done();
            });

            cr.addMember(member);
        });
    })
});