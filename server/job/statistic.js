'use strict';

/* eslint-disable no-console */

var util = require('util');
var models = require('../src/models');
var calculate = require('../src/libs/statistic');

// 1. Connect db
require('../src/db')
// 2. Get All Trainings
.then(getAllTrainings)
// 3. Calculate Statisic
.then((trainings) => {
  let stat = calculate(trainings);

  console.log(util.inspect(stat, { showHidden: false, depth: null }));

  return stat;
})
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
