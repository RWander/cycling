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

  return stat;
};

function getStatisticPoint(stat, path, type) {
  if (!stat[path]) {
    stat[path] = { };
  }
  if (!stat[path][type]) {
    stat[path][type] = {
      distance: 0,
      movingTime: 0,
      elapsedTime: 0,
      elevationGain: 0//,
      // averageSpeed: 0,
      // maxSpeed: 0
    };
  }
  return stat[path];
}

function add(point, training) {
  if (!point[training.type])
    point[training.type] = { };

  point.distance += training.distance;
  point.movingTime += training.movingTime;
  point.elapsedTime += training.elapsedTime;
  point.elevationGain += training.elevationGain;
  // let averageSpeed = training.averageSpeed;
  // let maxSpeed = training.maxSpeed;
}

module.exports = calculate;
