var express = require('express');
var config = require('config');
var request = require('request-promise');
var qs = require('qs');
var models = require('../models');

var router = express.Router();

var athletes = models.Athlete;

/* GET current athlete. */
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

router.get('/short', (req, res, next) => {
  fromDB()
    .then(
      info => res.send(info),
      err => next(err)
    );
});

/**
 * fromDB - Load athelete info from local db.
 *
 * @return {Promise}
 */
function fromDB() {
  return athletes.loadOne({ });
}

/**
 * fromStravaAPI - Loads athelete info from Strava API
 *
 * @return {Promise}
 */
function fromStravaAPI() {
  var strava = config.get('strava');
  var params = qs.stringify({ access_token: strava.accessToken });

  return request(strava.url + '/athlete?' + params);
}

module.exports = router;
