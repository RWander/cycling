/**
 * This script migrates data from Strava API to the local db.
 * Use the `gulp migrate` command.
 */

'use strict';

/* eslint-disable no-console */

var _ = require('lodash');
var strava = require('strava-v3');
var models = require('../src/models');

var currentAthlete;

// 1. Connect db
require('../src/db')
// 2. Get Current Athlete
.then(getCurrentAthelete)
// 3. Get all new activities of the currecnt athlete
.then((athlete) => {
  currentAthlete = athlete;
  return Promise.all([
    getStravaActivities(),
    getLocalActivities()
  ]);
})
// 4. Find activities from Strava API which do not exist in the local db.
.then((activities) => {
  let fromStrava = activities[0];
  let fromLocal = activities[1];
  let diff = _.differenceWith(fromStrava, fromLocal, (s, l) => s.id === l.stravaId);

  return diff;
})
// 4. Save activities into local db
.then((activities) => activities
  .map(createTraining)
  .map((t) => t.save())
)
// 5. Wait until all activities saved into local db
.then((promises) => Promise.all(promises))
// 6. Print result.
.then((trainings) => {
  trainings.forEach((t) => console.log(`Training '${t.name}' at ${t.startDate} is saved.`));
  console.log(`Total trainings: ${trainings.length}`);
})
.catch(console.log);

/**
 * getCurrentAthelete - Loads a current athlete info.
 *
 * @return {Promise}
 */
function getCurrentAthelete() {
  return models.Athlete.loadOne({ });
}

/**
 * getStravaActivities - Loads all athlete's activities from Strava API
 *
 * @return {Promise}
 */
function getStravaActivities() {
  return new Promise((resolve, reject) => {
    let pageNo = 1;
    const perPage = 200; //(200 is max - see http://strava.github.io/api/#pagination)
    let result = [];

    let pageLoader = () => {
      strava.athlete.listActivities({
        'page': pageNo,
        'per_page': perPage
      }, (err, payload) => {
        if (err) reject(err);
        if (payload != null && payload.length > 0) {
          pageNo++;
          result = result.concat(payload);
          pageLoader();
        } else {
          resolve(result);
        }
      });
    };

    pageLoader();
  });
}


/**
* getLocalActivities - Loads all local activities from the local db.
*
* @return {Promise}
 */
function getLocalActivities() {
  return models.Training.loadMany({ }, {
    populate: false // don't load refs
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
  training.stravaId = activity.id;
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
