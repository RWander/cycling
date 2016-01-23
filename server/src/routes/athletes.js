var express = require('express');
var config = require('config');
var request = require('request-promise');
var qs = require('qs');
var models = require('../models');

var router = express.Router();

var athletes = models.Athlete;

/* GET current athlete. */
router.get('/', (req, res, next) => {
  var strava = config.get('strava');
  var params = qs.stringify({ access_token: strava.accessToken });

  Promise.all([
    // Load athlete info from db
    athletes.loadOne({ }),
    // Load athlete info from the Strava API
    request(strava.url + '/athlete?' + params)
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

module.exports = router;
