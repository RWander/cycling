var express = require('express');
var config = require('config');
var request = require('request-promise');
var qs = require('qs');
var models = require('../models');

var router = express.Router();

var athletes = models.Athlete;

/* GET current athlete. */
router.get('/', (req, res, next) => {
  athletes
    .loadOne({ }) // get first athelete
    .then((me) => attachStravaProfile(me, req, res, next));
});

function attachStravaProfile(profile, req, res, next) {
  var strava = config.get('strava');
  var params = qs.stringify({
    access_token: strava.accessToken
  });

  request(strava.url + '/athlete?' + params)
   .then((body) => {
     profile.stravaProfile = body;
     res.send(profile);
   })
   .catch((err) => next(err));
}

module.exports = router;
