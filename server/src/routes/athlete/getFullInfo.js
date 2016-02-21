'use strict';

var moment = require('moment');
var models = require('../../models');

function getFullInfo(req, res, next) {
  let types = models.TRAINING_TYPE.vals();
  let currentTime = moment();
  let year = currentTime.format('YYYY');  // Current Year (2016)
  let month = currentTime.format('MMM');  // Current Month (Feb)
  let week = currentTime.format('WW');    // Current Week (06)
  let day = currentTime.format('DD');     // Current Day (10)

  // Путь для получения ститистики "за сегодня", "за неделю", "за месяц",
  // "за год" и "за все время".
  let jsonPath = `take(${
    types
      .map(type => `/${type}`)
      .concat([
        `/${year}/${month}/${week}/${day}`,
        `/${year}/${month}/${week}`,
        `/${year}/${month}`,
        `/${year}`
      ])
      .join()
  })`;

  Promise.all([
    models.Athlete.loadCurrent(),
    models.Training.loadCurrent(),
    models.Training.loadStatisticCurrent(jsonPath)
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
