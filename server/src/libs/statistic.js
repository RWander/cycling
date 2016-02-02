'use strict';

var moment = require('moment');

/**
 * calculate - Calculate Statisic
 *
 * @param  {Array} trainings
 */
var calculate = function (trainings) {
  let stat = {};

  trainings.forEach((t) => {
    let date = moment(t.startDate);

    // http://momentjs.com/docs/#/displaying/format/
    let paths = [
      null,                 // Total
      date.format('YYYY'),  // Year (1970 1971 ... 2029 2030)
      date.format('MMM'),   // Month (Jan Feb ... Nov Dec)
      date.format('WW'),    // Week of Year (ISO) (01 02 ... 52 53)
      date.format('DD')     // Day of Month (01 02 ... 30 31)
    ];

    let point = stat;
    paths.forEach((path) => {
      point = getStatisticPoint(point, path, t.type);
      add(point[t.type], t);
    });
  });

  return stat;
};

function getStatisticPoint(stat, path, type) {
  let point;
  if (path === null) {
    point = stat;
  } else {
    if (!stat[path]) {
      stat[path] = { };
    }
    point = stat[path];
  }

  if (!point[type]) {
    point[type] = {
      distance: 0,
      movingTime: 0,
      elapsedTime: 0,
      elevationGain: 0//,
      // averageSpeed: 0,
      // maxSpeed: 0
    };
  }
  return point;
}

function add(point, training) {
  point.distance += training.distance;
  point.movingTime += training.movingTime;
  point.elapsedTime += training.elapsedTime;
  point.elevationGain += training.elevationGain;
  // let averageSpeed = training.averageSpeed;
  // let maxSpeed = training.maxSpeed;
}

module.exports = calculate;
