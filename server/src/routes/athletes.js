'use strict';

var express = require('express');
var jpath = require('json-path');
var models = require('../models');
var statistic = require('../libs/statistic');

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
 * GETs full information about athelete (including tarining log and statistic).
 * TODO (rwander): return only recent training log.
 */
router.get('/full', (req, res, next) => {
  Promise.all([
    loadAthlete(),
    loadTrainigns(),
    loadStatistic()
  ]).then(results => {
    res.send({
      athlete: results[0],
      trainings: results[1],
      statistic: results[2]
    });
  })
  .catch(next);
});

/**
 * GETs a full athelete information including track history.
 */
router.get('/activities', (req, res, next) => {
  loadTrainigns()
    .then(trainings => { res.send(trainings); })
    .catch(next);
});

/**
 * GETs a training statistic for the currect athlete.
 */
router.get('/statistic', (req, res, next) => {
  // TODO (rwander): validate req.query param.
  var path = req.query.path;

  loadStatistic(path)
    .then(stat => { res.send(stat); })
    .catch(next);
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


 /**
  * loadStatistic - Loads athelete's statistic trainings.
  *
  * @param  {String}  path  Json-path string (see https://github.com/flitbit/json-path)
  * @return {Promise}
  */
function loadStatistic(path) {
  path = path ? path : '';
  if (statisticObj) {
    return new Promise(resolve => resolve(jpath.resolve(statisticObj, path)));
  } else {
    return loadTrainigns()
      .then(trainings => {
        statisticObj = statistic(trainings);
        return jpath.resolve(statisticObj, path);
      });
  }
}
var statisticObj;

module.exports = router;
