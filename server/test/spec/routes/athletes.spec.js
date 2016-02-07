'use strict';

/* eslint-disable no-undef */

describe('Athlete routes', function()  {
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

        expect(res.body).hasAtheleteSchema();
        done();
      });
  });

  it('HTTP GET /full - full athlete info', function(done) {
    request(app)
      .get('/full')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;

        expect(res.body).hasFullAthleteInfoSchema();
        done();
      });
  });

  it('HTTP GET /activities - athelete`s activities', function(done) {
    request(app)
      .get('/activities')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;

        let trainings = res.body;
        expect(Array.isArray(trainings)).toBeTruthy();
        trainings.forEach(t => expect(t).hasTrainingSchema());
        done();
      });
  });

  it('HTTP GET /statistic - athelete`s activities', function(done) {
    request(app)
      .get('/statistic')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;

        // TODO (rwander)
        // validate statistic schema

        done();
      });
  });
});
