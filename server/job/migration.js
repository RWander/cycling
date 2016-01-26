/**
 * This script migrates data from Strava API to the local db.
 * Use the `gulp migrate` command.
 */

'use strict';

var strava = require('strava-v3');
var models = require('../src/models');

var currentAthlete;

// 1. Connect db
require('../src/db')
// 2. Get Current Athlete
.then(() => getCurrentAthelete())
// 3. Get all activities of the currecnt athlete
.then((athlete) => {
  currentAthlete = athlete;
  return getActivities();
})
// 4. Save activities into local db
.then((activities) => activities
  .map(createTraining)
  .map((t) => t.save())
)
// 5. Wait until all activities saved into local db
.then((promises) => Promise.all(promises))
// 6. Calulate statistic.
.then((trainings) => {
  trainings.forEach((training) => {

    // TODO
    // ..

    /* eslint-disable no-console */
    console.log(`Training '${training.name}' at ${training.date} is saved.`);
    /* eslint-disable no-console */
  });
})
.catch((err) => {
  /* eslint-disable no-console */
  console.log(err);
  /* eslint-disable no-console */
});

/**
 * getCurrentAthelete - Loads a current athlete info.
 *
 * @return {Promise}
 */
function getCurrentAthelete() {
  return models.Athlete.loadOne({ });
}

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
  let training = models.Training.create();

  training.name = '1';
  training.desc = '2';
  training.type = 1;
  //training.date = Date.now;
  training.athlete = currentAthlete;

  return training;
}
