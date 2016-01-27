'use strict';

var express = require('express');
var strava = require('strava-v3');

var models = require('../models');
var athletes = models.Athlete;

var router = express.Router();

/**
 * GETs a information about athelete (from local db and Strava API).
 */
router.get('/', (req, res, next) => {
  Promise.all([
    // Load athlete info from db
    fromDB(),
    // Load athlete info from the Strava API
    fromStravaAPI()
  ])
  .then(
    results => {
      let info = results[0];
      info.stravaProfile = results[1];
      res.send(info);
    },
    err => next(err)
  );
});


/**
 * GETs a short information about athelete (from local db).
 */
router.get('/short', (req, res, next) => {
  fromDB()
    .then(
      info => res.send(info),
      err => next(err)
    );
});


/**
 * GETs a full athelete information including track history.
 */
router.get('/activities', (req, res, next) => {
  fromStravaAPIGetActivities()
    .then(
      activities => res.send(activities),
      err => next(err)
    );
});


/**
 * fromDB - Loads athelete info from local db.
 *
 * @return {Promise}
 */
function fromDB() {
  return athletes.loadOne({ });
}


/**
 * fromStravaAPI - Loads athelete info from Strava API.
 *
 * @return {Promise}
 */
function fromStravaAPI() {
  return new Promise((resolve, reject) => {
    strava.athlete.get({ }, (err, payload) => {
      if (err) reject(err);
      resolve(payload);
    });
  });
}


/**
 * fromStravaAPIGetActivities - Loads athelete's activities from Strava API.
 *
 * @return {Promise}
 */
function fromStravaAPIGetActivities() {
  return new Promise((resolve, reject) => {
    strava.athlete.listActivities({
      'page': 1,
      'per_page': 200
    }, (err, payload) => {
      if (err) reject(err);
      resolve(payload);
    });
  });
}

module.exports = router;
