'use strict';

var express = require('express');
var jpath = require('json-path');
var models = require('../models');
var statistic = require('../libs/statistic');

var statisticObj;

var router = express.Router();

/**
 * GETs a information about athelete.
 */
router.get('/', (req, res, next) => {
  loadAthlete()
    .then(info => res.send(info))
    .catch(next);
});


/**
 * GETs a full athelete information including track history.
 */
router.get('/activities', (req, res, next) => {
  loadTrainigns()
    .then((trainings) => {
      res.send(trainings);
    })
    .catch(next);
});


/**
 * GETs a training statistic for the currect athlete.
 */
router.get('/statistic', (req, res, next) => {
  // TODO (rwander): validate req.query param.
  // ..
  var path = req.query.path ? req.query.path : '';

  if (statisticObj) {
    let data = jpath.resolve(statisticObj, path);
    res.send(data);
  } else {
    // calculate statisticObj
    loadTrainigns()
      .then((trainings) => {
        statisticObj = statistic(trainings);

        let data = jpath.resolve(statisticObj, path);
        res.send(data);
      })
      .catch(next);
  }
});

/**
 * fromDB - Loads athelete from local db.
 *
 * @return {Promise}
 */
function loadAthlete() {
  return models.Athlete.loadOne({ });
}

/**
 * fromDB - Loads athelete's trainings from local db.
 *
 * @return {Promise}
 */
function loadTrainigns() {
  return models.Training.loadMany({ }, {
    populate: false // don't load refs
  });
}

module.exports = router;
