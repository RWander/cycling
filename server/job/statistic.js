'use strict';

/* eslint-disable no-console */

var _ = require('lodash');
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

    let type = t.type;
    let dist = t.distance;
    let movingTime = t.movingTime;
    let elapsedTime = t.elapsedTime;
    let elevationGain = t.elevationGain;
    let averageSpeed = t.averageSpeed;
    let maxSpeed = t.maxSpeed;

    if (!stat[year]) stat[year] = { Total: { } };
    if (!stat[year][month]) stat[year][month] = { Total: { } };
    if (!stat[year][month][weak]) stat[year][month][weak] = { Total: { } };
    if (!stat[year][month][weak][day]) stat[year][month][weak][day] = { Total: { } };
  });

  debugger;

  console.log(util.inspect(stat, { showHidden: false, depth: null }));

  return stat;
}
