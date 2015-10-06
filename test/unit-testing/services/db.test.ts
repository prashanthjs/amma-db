import Hapi = require('hapi');
import Code = require('code');
import Lab = require('lab');
import Sinon = require('sinon');
import AmmaDb = require('../../../index');
import Mongoose = require('mongoose');

let lab = exports.lab = Lab.script(),
  before = lab.before,
  beforeEach = lab.beforeEach,
  afterEach = lab.afterEach,
  after = lab.after,
  expect = Code.expect,
  suite = lab.suite,
  test = lab.test;

suite('Test DB Server', () => {
  let server;
  let dbOptions = {
    options: {
      db: {
        uri: 'test',
        options: {}
      }
    }
  };
  suite('Test ConnectDB function', () => {

    beforeEach((next) => {
      server = new Hapi.Server();
      next();
    });

    test('Successful connection', (next) => {
      let stub = Sinon.stub(Mongoose, 'connect', function(uri, options, done) {
        return done();
      });
      server.register({ register: AmmaDb, options: dbOptions }, (err) => {
        expect(err).to.equal(undefined);
        stub.restore();
        next();
      });
    });

    test('Unsuccessful connection', (next) => {
      let stub = Sinon.stub(Mongoose, 'connect', function(uri, options, done) {
        return done('database error');
      });
      server.register({ register: AmmaDb, options: dbOptions }, (err) => {
        expect(err).to.be.exist();
        stub.restore();
        next();
      });
    });
  });

  suite('Test disconnectDb function', () => {

    beforeEach((next) => {
      server = new Hapi.Server();
      next();
    });

    test('Successful connection', (next) => {
      let spy = Sinon.spy();

      let stub1 = Sinon.stub(Mongoose, 'connect', function(uri, options, done) {
        return done();
      });
      let stub2 = Sinon.stub(Mongoose, 'disconnect', (cb) => {
        return cb();
      });
      server.register({ register: AmmaDb, options: dbOptions }, (err) => {
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
