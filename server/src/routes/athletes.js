var express = require('express');
var config = require('config');
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
      var info = results[0];
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
router.get('/full', (req, res, next) => {
  // TODO
  // ..
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
  return new Promise(function(resolve, reject) {
    strava.athlete.get({ }, (err, payload) => {
      if (err) reject(err);
      resolve(payload);
    });
  });
}

module.exports = router;
