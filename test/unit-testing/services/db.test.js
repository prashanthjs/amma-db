var Hapi = require('hapi');
var Code = require('code');
var Lab = require('lab');
var Sinon = require('sinon');
var AmmaDb = require('../../../index');
var Mongoose = require('mongoose');
var lab = exports.lab = Lab.script(), before = lab.before, beforeEach = lab.beforeEach, afterEach = lab.afterEach, after = lab.after, expect = Code.expect, suite = lab.suite, test = lab.test;
suite('Test DB Server', function () {
    var server;
    var dbOptions = {
        options: {
            db: {
                uri: 'test',
                options: {}
            }
        }
    };
    suite('Test ConnectDB function', function () {
        beforeEach(function (next) {
            server = new Hapi.Server();
            next();
        });
        test('Successful connection', function (next) {
            var stub = Sinon.stub(Mongoose, 'connect', function (uri, options, done) {
                return done();
            });
            server.register({ register: AmmaDb, options: dbOptions }, function (err) {
                expect(err).to.equal(undefined);
                stub.restore();
                next();
            });
        });
        test('Unsuccessful connection', function (next) {
            var stub = Sinon.stub(Mongoose, 'connect', function (uri, options, done) {
                return done('database error');
            });
            server.register({ register: AmmaDb, options: dbOptions }, function (err) {
                expect(err).to.be.exist();
                stub.restore();
                next();
            });
        });
    });
    suite('Test disconnectDb function', function () {
        beforeEach(function (next) {
            server = new Hapi.Server();
            next();
        });
        test('Successful connection', function (next) {
            var spy = Sinon.spy();
            var stub1 = Sinon.stub(Mongoose, 'connect', function (uri, options, done) {
                return done();
            });
            var stub2 = Sinon.stub(Mongoose, 'disconnect', function (cb) {
                return cb();
            });
            server.register({ register: AmmaDb, options: dbOptions }, function (err) {
                expect(err).to.equal(undefined);
                server.plugins['amma-db'].dbService.disconnectDb(spy);
                expect(spy.called).to.be.true();
                stub1.restore();
                stub2.restore();
                return next();
            });
        });
    });
});
