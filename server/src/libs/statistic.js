'use strict';

var moment = require('moment');
var jpath = require('json-path');

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
      point = _getStatisticPoint(point, path, t.type);
      _add(point[t.type], t);
    });
  });

  return stat;
};

/**
 * convertToShort - Returns short statistic
 *
 * @param  {Object} Short Statistic.
 */
var convertToShort = function (statistic) {
  let currentTime = moment();
  let year = currentTime.format('YYYY');  // Current Year (2016)
  let month = currentTime.format('MMM');  // Current Month (Feb)
  let week = currentTime.format('WW');    // Current Week (06)
  let day = currentTime.format('DD');     // Current Day (10)

  let todayStat = jpath.resolve(statistic, `/${year}/${month}/${week}/${day}`);
  let weekStat = jpath.resolve(statistic, `/${year}/${month}/${week}`);
  let monthStat = jpath.resolve(statistic, `/${year}/${month}`);
  let yearStat = jpath.resolve(statistic, `/${year}`);

  let res = {
    today: _calcShortStatItem(todayStat),
    week: _calcShortStatItem(weekStat),
    month: _calcShortStatItem(monthStat),
    year: _calcShortStatItem(yearStat),
    total: _calcShortStatItem(statistic)
  };

  return res;
};

// private
function _calcShortStatItem(stat) {
  if (stat.length > 0) {
    let s = stat[0];
    return {
      cycling: s.cycling ? Number((s.cycling.distance/1000).toFixed(1)) /*m to km*/ : 0,
      run: s.run ? Number((s.run.distance/1000).toFixed(1)) /*m to km*/ : 0,
      ski: s.ski ? Number((s.ski.distance/1000).toFixed(1)) /*m to km*/ : 0,
      swim: s.swim ? Number((s.swim.distance/1000).toFixed(1)) /*m to km*/ : 0
    };
  } else {
    return {
      cycling: 0,
      run: 0,
      ski: 0,
      swim: 0
    };
  }
}

// private
function _getStatisticPoint(stat, path, type) {
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

// private
function _add(point, training) {
  point.distance += training.distance;
  point.movingTime += training.movingTime;
  point.elapsedTime += training.elapsedTime;
  point.elevationGain += training.elevationGain;
  // let averageSpeed = training.averageSpeed;
  // let maxSpeed = training.maxSpeed;
}

module.exports = {
  calculate: calculate,
  convertToShort: convertToShort
};
