'use strict';

/* eslint-disable no-undef */

describe('Calculate statistic', function() {
  var _ = require('lodash');
  var calculate = require('../../src/libs/statistic');
  var generator = require('./helpers/generator');
  const TRAINING_TYPE = require('../../src/models').TRAINING_TYPE;

  it('Check statistic', function() {
    let trainings = generator.trainings(10);
    let stat = calculate(trainings);

    // Statisitic Level # 0 - Year
    let years = _.keys(stat);
    years.forEach((year) => {
      expect(year).isYearYYYY();

      // Statisitic Level # 1 - Month and Totals
      let data = stat[year];

      let cycStat = data[TRAINING_TYPE[TRAINING_TYPE.cycling]];
      let runStat = data[TRAINING_TYPE[TRAINING_TYPE.run]];
      let skiStat = data[TRAINING_TYPE[TRAINING_TYPE.ski]];

      // Anything must be exist
      expect(!!runStat || !!cycStat || !!skiStat).toEqual(true);

      // // Check totals
      // if (!!runStat) {
      //   // TODO
      //   // ..
      // }
      //
      // if (!!cycStat) {
      //   // TODO
      //   // ..
      // }
      //
      // if (!!skiStat) {
      //   // TODO
      //   // ..
      // }

      // Check months
      let months = _.omit(data, TRAINING_TYPE.vals());
      expect(months.length).not.toEqual(0);

      let monthNames = _.keys(months);
      monthNames.forEach((monthName) => {
        let month = months[monthName];

        //debugger;

        // TODO
        // ..
      });
    });
  });
});
