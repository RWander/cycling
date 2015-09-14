import express = require('express');
import config = require('config');
import request = require('request-promise');
import qs = require('qs');

var router = express.Router();

/* GET current athlete. */
router.get('/', (req, res, next) => {
  var strava = config.get<any>('strava');
  var params = qs.stringify({ access_token: strava.accessToken });
  request(strava.url + '/athlete?' + params)
    .then((body) => res.send(body))
    .catch((err) => next(err)
  );
});

export = router;
