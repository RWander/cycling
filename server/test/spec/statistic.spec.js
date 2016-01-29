'use strict';

/* eslint-disable no-undef */

describe('Calculate statistic', function() {
  var faker = require('faker');
  var calculate = require('../../src/libs/statistic');

  it('1 is 1', function() {
    let trainings = generateTrainings();
    let stat = calculate(trainings);

    // TODO: temporary failed
    // ..

    expect(stat).toEqual({});
  });

  function generateTrainings() {
    let trainings = [];

    for(let i = 0; i < 10; i++) {
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
        type: faker.random.number({
          min: 1,
          max: 3
        }),
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
  }
});
