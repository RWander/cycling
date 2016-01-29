'use strict';

/* eslint-disable no-console */

var moment = require('moment');
var util = require('util');
var models = require('../src/models');

// 1. Connect db
require('../src/db')
// 2. Get All Trainings
.then(getAllTrainings)
// 3. Calculate Statisic
.then(calculate)
// 4. Catch error
.catch(console.log);


/**
 * getAllTrainings - Gets all trainings.
 *
 * @return {Promise}
 */
function getAllTrainings() {
  return models.Training.loadMany({ }, {
    populate: false // don't load refs
  });
}


/**
 * calculate - Calculate Statisic
 *
 * @param  {Array} trainings
 */
function calculate(trainings) {
  let stat = {};

  trainings.forEach((t) => {
    let date = moment(t.startDate);

    // http://momentjs.com/docs/#/displaying/format/
    let year = date.format('YYYY'); // Year (1970 1971 ... 2029 2030)
    let month = date.format('MMM'); // Month (Jan Feb ... Nov Dec)
    let weak = date.format('WW');   // Week of Year (ISO) (01 02 ... 52 53)
    let day = date.format('DD');    // Day of Month (01 02 ... 30 31)

    let point = getStatisticPoint(stat, year, t.type);
    add(point[t.type], t);

    point = getStatisticPoint(point, month, t.type);
    add(point[t.type], t);

    point = getStatisticPoint(point, weak, t.type);
    add(point[t.type], t);

    point = getStatisticPoint(point, day, t.type);
    add(point[t.type], t);
  });

  // debug
  console.log(util.inspect(stat, { showHidden: false, depth: null }));

  return stat;
}

function getStatisticPoint(stat, path, type) {
  if (!stat[path]) {
    stat[path] = { };
  }
  if (!stat[path][type]) {
    stat[path][type] = {
      total: {
        distance: 0,
        movingTime: 0,
        elapsedTime: 0,
        elevationGain: 0//,
        // averageSpeed: 0,
        // maxSpeed: 0
      }
    };
  }
  return stat[path];
}

function add(point, training) {
  if (!point.total[training.type])
    point.total[training.type] = { };

  point.total.distance += training.distance;
  point.total.movingTime += training.movingTime;
  point.total.elapsedTime += training.elapsedTime;
  point.total.elevationGain += training.elevationGain;
  // let averageSpeed = training.averageSpeed;
  // let maxSpeed = training.maxSpeed;
}
