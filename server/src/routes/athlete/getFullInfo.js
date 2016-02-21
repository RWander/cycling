'use strict';

var models = require('../../models');

function getFullInfo(req, res, next) {
  Promise.all([
    models.Athlete.loadCurrent(),
    models.Training.loadCurrent(),
    models.Training.loadShortStatistic()
  ]).then(results => {
    res.send({
      athlete: results[0],
      trainings: results[1],
      statistic: results[2]
    });
  })
  .catch(next);
}

module.exports = getFullInfo;
