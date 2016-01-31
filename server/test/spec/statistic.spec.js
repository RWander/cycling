'use strict';

/* eslint-disable no-undef */

describe('Calculate statistic', function() {
  var _ = require('lodash');
  var calculate = require('../../src/libs/statistic');
  var generator = require('./helpers/generator');

  it('Check statistic', function() {
    let trainings = generator.trainings(10);
    let stat = calculate(trainings);

    // Statisitic Level # 0 - Year
    let years = _.keys(stat);
    years.forEach((year) => {
      expect(year).isYearYYYY();

      // Statisitic Level # 1 - Month and Totals
      let data = stat[year];

      let runStat = data['1'];
      let cycStat = data['2'];
      let skiStat = data['3'];

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

      let months = _.ddd(data, ['1', '2', '3']);
      expect(months.length).not.toEqual(0);

      // Check months
      months.forEach((month) => {
        // ..
      });
    });
  });
});
