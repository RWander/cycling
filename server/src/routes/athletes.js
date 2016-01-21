var express = require('express');
var config = require('config');
var request = require('request-promise');
var qs = require('qs');

var router = express.Router();

/* GET current athlete. */
router.get('/', (req, res, next) => {
  var info = config.get('me');
  setStravaProfile(info, req, res, next);
});

function setStravaProfile(info, req, res, next) {
  var strava = config.get('strava');
  var params = qs.stringify({
    access_token: strava.accessToken
  });

  request(strava.url + '/athlete?' + params)
   .then((body) => {
     info.stravaProfile = body;
     res.send(info);
   })
   .catch((err) => next(err));
}

module.exports = router;
