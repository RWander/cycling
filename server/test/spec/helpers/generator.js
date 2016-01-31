
'use strict';

/**
 * anonymous function - Generate training objects.
 *
 * @param  {Number} count Count of trainings
 * @return {Array}        Trainings
 */
var getTrainings = function (count) {
  var faker = require('faker');
  const TRAINING_TYPE = require('../../../src/models').TRAINING_TYPE;

  let trainings = [];

  for(let i = 0; i < count; i++) {
    let movingTime = faker.random.number({
      min: 1800, // 30 mins
      max: 14400 // 4 hours
    });
    let elapsedTime = faker.random.number({
      min: movingTime, // movingTime + delta mins
      max: 14400 // 4 hours
    });

    let training = {
      stravaId: faker.random.number(),
      name: faker.lorem.sentence(),
      desc: faker.lorem.sentence(),
      type: faker.random.arrayElement(TRAINING_TYPE.vals()),
      startDate: faker.date.between(new Date(2014, 0, 1), new Date()),
      athlete: {
        // don't use
      },
      distance: faker.random.number({
        min: 1000,
        max: 30000
      }),
      movingTime: movingTime,
      elapsedTime: elapsedTime,
      elevationGain: faker.random.number({
        min: 20,
        max: 500
      })
      //averageSpeed:
      //maxSpeed:
    };
    trainings.push(training);
  }

  // debugger;

  return trainings;
};

module.exports.trainings = getTrainings;
