/**
 * This script migrates data from Strava API to the local db.
 * Use the `gulp migrate` command.
 */

'use strict';

var strava = require('strava-v3');
var camo = require('camo');

var models = require('../src/models');
var trainings = models.Training;

require('../src/db');

getActivities()
  .then((activities) => activities
      .map(createTraining)
      .map((t) => t.save())
  )
  .then((promises) => Promise.all(promises))
  .then((trainings) => {
    trainings.forEach((training) => {

      // TODO
      // ..

      /* eslint-disable no-console */
      console.log(`Training saved: ${training}`);
      /* eslint-disable no-console */
    });
  })
  .catch((err) => {
    /* eslint-disable no-console */
    console.log(err);
    /* eslint-disable no-console */
  });

/**
 * getActivities - Loads athlete's activities
 *
 * @return {Promise}
 */
function getActivities() {
  return new Promise((resolve, reject) => {
    // TODO: load only newer activities
    // ..
    strava.athlete.listActivities({
      'page': 1,
      'per_page': 200
    }, (err, payload) => {
      if (err) reject(err);
      resolve(payload);
    });
  });
}


/**
 * createTraining - Creates Training object.
 *
 * @param  {Object} Strava activity object.
 * @return {Training} Training object.
 */
function createTraining(activity) {
  let training = trainings.create();

  // TODO
  // ..

  return training;
}
