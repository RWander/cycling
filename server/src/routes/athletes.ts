import express = require('express');
import config = require('config');
import request = require('request-promise');

var router = express.Router();

/* GET current athlete. */
router.get('/', (req, res, next) => {
  var strava = config.get<any>('strava');
  request(strava.url + 'athlete?access_token=' + strava.accessToken)
    .then((body) => res.send(body))
    .catch((err) => next(err)
  );
});

export = router;
