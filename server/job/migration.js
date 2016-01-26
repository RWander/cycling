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
    console.log(`Training '${training.name}' at ${training.startDate} is saved.`);
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

  // see http://strava.github.io/api/v3/activities/
  training.name = activity.name;
  training.desc = activity.description;
  training.distance = activity.distance;
  training.movingTime = activity.moving_time;
  training.elapsedTime = activity.elapsed_time;
  training.elevationGain = activity.total_elevation_gain;
  training.startDate = new Date(activity.start_date);
  training.athlete = currentAthlete;
  training.averageSpeed = activity.average_speed;
  training.maxSpeed = activity.max_speed;

  var type = activity.type.toLowerCase();
  var lowerName = activity.name.toLowerCase();
  if (type === 'ride') {
    training.type = 1;
  }
  else if (type === 'run' && !lowerName.includes('лыжи')) {
    training.type = 2;
  }
  else if (type.includes('ski') || lowerName.includes('лыжи')) {
    training.type = 3;
  }

  return training;
}
