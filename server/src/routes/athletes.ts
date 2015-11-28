import express = require('express');
import config = require('config');
import request = require('request-promise');
import qs = require('qs');

var router = express.Router();

/* GET current athlete. */
router.get('/', (req, res, next) => {
  var info: any = config.get('me');
  setStravaProfile(info, req, res, next);
});

function setStravaProfile(
  info: any,
  req: express.Request,
  res: express.Response,
  next: Function): void {
  var strava = config.get<any>('strava');
  var params = qs.stringify({ access_token: strava.accessToken });

  request(strava.url + '/athlete?' + params)
   .then((body) => {
     info.stravaProfile = body;
     res.send(info);
   })
   .catch((err) => next(err));
}

export = router;
