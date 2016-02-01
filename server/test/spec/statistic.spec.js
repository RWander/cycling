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
      let yearData = stat[year];

      let cycStatYear = yearData[TRAINING_TYPE[TRAINING_TYPE.cycling]];
      let runStatYear = yearData[TRAINING_TYPE[TRAINING_TYPE.run]];
      let skiStatYear = yearData[TRAINING_TYPE[TRAINING_TYPE.ski]];

      // Anything must be exist
      expect(!!runStatYear || !!cycStatYear || !!skiStatYear).toEqual(true);

      // // Check totals
      // if (!!runStatYear) {
      //   // TODO
      //   // ..
      // }
      //
      // if (!!cycStatYear) {
      //   // TODO
      //   // ..
      // }
      //
      // if (!!skiStatYear) {
      //   // TODO
      //   // ..
      // }

      // Check months
      let months = _.omit(yearData, TRAINING_TYPE.vals());
      expect(months.length).not.toEqual(0);

      let monthNames = _.keys(months);
      monthNames.forEach((monthName) => {
        expect(monthName).isMonthMMM();

        let monthData = months[monthName];

        let cycStatMonth = monthData[TRAINING_TYPE[TRAINING_TYPE.cycling]];
        let runStatMonth = monthData[TRAINING_TYPE[TRAINING_TYPE.run]];
        let skiStatMonth = monthData[TRAINING_TYPE[TRAINING_TYPE.ski]];

        expect(!!cycStatMonth || !!runStatMonth || !!skiStatMonth).toEqual(true);

        // // Check totals
        // if (!!cycStatMonth) {
        //   // TODO
        //   // ..
        // }
        //
        // if (!!runStatMonth) {
        //   // TODO
        //   // ..
        // }
        //
        // if (!!skiStatMonth) {
        //   // TODO
        //   // ..
        // }

        // Check weeks
        let weeks = _.omit(monthData, TRAINING_TYPE.vals());
        expect(weeks.length).not.toEqual(0);

        let weekNames = _.keys(weeks);
        weekNames.forEach((weekName) => {
          expect(weekName).isWeekNumber();

          let weekData = weeks[weekName];

          let cycStatWeek = weekData[TRAINING_TYPE[TRAINING_TYPE.cycling]];
          let runStatWeek = weekData[TRAINING_TYPE[TRAINING_TYPE.run]];
          let skiStatWeek = weekData[TRAINING_TYPE[TRAINING_TYPE.ski]];

          expect(!!cycStatWeek || !!runStatWeek || !!skiStatWeek).toEqual(true);

          // // Check totals
          // if (!!cycStatWeek) {
          //   // TODO
          //   // ..
          // }
          //
          // if (!!runStatWeek) {
          //   // TODO
          //   // ..
          // }
          //
          // if (!!skiStatWeek) {
          //   // TODO
          //   // ..
          // }
          //
          
        });

        debugger;
      });
    });
  });
});
