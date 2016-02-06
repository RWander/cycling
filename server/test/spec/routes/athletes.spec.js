'use strict';

/* eslint-disable no-undef */


describe('Athlete routes', function()  {
  var _ = require('lodash');
  var request = require('supertest');
  var app;

  beforeAll(function(done)  {
    require('../../../src/app').then(a => {
      app = a;
      done();
    });
  });

  it('HTTP GET / - athlete info', function(done) {
    request(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;

        let props = _.keys(res.body);
        let diff = _.xor(
          props,
          ['_id', 'firstName', 'lastName', 'birthday', 'country', 'city', 'bio']
        );

        expect(diff).toEqual([]);

        done();
      });
  });

  // TODO (rwander): test all routes
  // ..
});
