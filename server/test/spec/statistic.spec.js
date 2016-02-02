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

    let createStatPoint = () => {
      return {
        distance: 0,
        movingTime: 0,
        elapsedTime: 0,
        elevationGain: 0
      };
    };

    // Statisitic Level # 0 - Year
    let years = _.keys(stat);
    years.forEach((year) => {
      expect(year).isYearYYYY();

      // Statisitic Level # 1 - Month and Totals
      let yearData = stat[year];

      let cycYearActual = yearData[TRAINING_TYPE[TRAINING_TYPE.cycling]];
      let cycYearExpected = createStatPoint();
      let runYearActual = yearData[TRAINING_TYPE[TRAINING_TYPE.run]];
      let runYearExpected = createStatPoint();
      let skiYearActual = yearData[TRAINING_TYPE[TRAINING_TYPE.ski]];
      let skiYearExpected = createStatPoint();

      // Anything must be exist
      expect(!!runYearActual || !!cycYearActual || !!skiYearActual).toEqual(true);

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

        let cycMonthActual = monthData[TRAINING_TYPE[TRAINING_TYPE.cycling]];
        let cycMonthExpected = createStatPoint();
        let runMonthActual = monthData[TRAINING_TYPE[TRAINING_TYPE.run]];
        let runMonthExpected = createStatPoint();
        let skiMonthActual = monthData[TRAINING_TYPE[TRAINING_TYPE.ski]];
        let skiMonthExpected = createStatPoint();

        expect(!!cycMonthActual || !!runMonthActual || !!skiMonthActual).toEqual(true);

        // // Check totals
        // if (!!cycMonthActual) {
        //   // TODO
        //   // ..
        // }
        //
        // if (!!runMonthActual) {
        //   // TODO
        //   // ..
        // }
        //
        // if (!!skiMonthActual) {
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

          let cycWeekActual = weekData[TRAINING_TYPE[TRAINING_TYPE.cycling]];
          let cycWeekExpected = createStatPoint();
          let runWeekActual = weekData[TRAINING_TYPE[TRAINING_TYPE.run]];
          let runWeekExpected = createStatPoint();
          let skiWeekActual = weekData[TRAINING_TYPE[TRAINING_TYPE.ski]];
          let skiWeekExpected = createStatPoint();

          expect(!!cycWeekActual || !!runWeekActual || !!skiWeekActual).toEqual(true);

          // // Check totals
          // if (!!cycWeekActual) {
          //   // TODO
          //   // ..
          // }
          //
          // if (!!runWeekActual) {
          //   // TODO
          //   // ..
          // }
          //
          // if (!!skiWeekActual) {
          //   // TODO
          //   // ..
          // }

          // Check days
          let days = _.omit(weekData, TRAINING_TYPE.vals());
          expect(days.length).not.toEqual(0);

          let daysNums = _.keys(days);
          daysNums.forEach((day) => {
            expect(day).isDayNumber();

            let dayData = weekData[day];

            let cycDayActual = dayData[TRAINING_TYPE[TRAINING_TYPE.cycling]];
            let cycDayExpected = createStatPoint();
            let runDayActual = dayData[TRAINING_TYPE[TRAINING_TYPE.run]];
            let runDayExpected = createStatPoint();
            let skiDayActual = dayData[TRAINING_TYPE[TRAINING_TYPE.ski]];
            let skiDayExpected = createStatPoint();

            expect(!!cycDayActual || !!runDayActual || !!skiDayActual).toEqual(true);

            // // Check totals
            // if (!!cycDayActual) {
            //   // TODO
            //   // ..
            // }
            //
            // if (!!runDayActual) {
            //   // TODO
            //   // ..
            // }
            //
            // if (!!skiDayActual) {
            //   // TODO
            //   // ..
            // }
          });
        });
      });
    });
  });
});
