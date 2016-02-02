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

    let addStatPoint = (x, y) => {
      x.distance += y.distance;
      x.movingTime += y.movingTime;
      x.elapsedTime += y.elapsedTime;
      x.elevationGain += y.elevationGain;
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

      // Check totals
      if (runYearActual) expect(runYearActual).isCorrectStatisticPoint();
      if (cycYearActual) expect(cycYearActual).isCorrectStatisticPoint();
      if (skiYearActual) expect(skiYearActual).isCorrectStatisticPoint();

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

        // Check totals
        if (cycMonthActual) expect(cycMonthActual).isCorrectStatisticPoint();
        if (runMonthActual) expect(runMonthActual).isCorrectStatisticPoint();
        if (skiMonthActual) expect(skiMonthActual).isCorrectStatisticPoint();

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

          // Check totals
          if (cycWeekActual) expect(cycWeekActual).isCorrectStatisticPoint();
          if (runWeekActual) expect(runWeekActual).isCorrectStatisticPoint();
          if (skiWeekActual) expect(skiWeekActual).isCorrectStatisticPoint();

          // Check days
          let days = _.omit(weekData, TRAINING_TYPE.vals());
          expect(days.length).not.toEqual(0);

          let daysNums = _.keys(days);
          daysNums.forEach((day) => {
            expect(day).isDayNumber();

            let dayData = weekData[day];

            let cycDayActual = dayData[TRAINING_TYPE[TRAINING_TYPE.cycling]];
            let runDayActual = dayData[TRAINING_TYPE[TRAINING_TYPE.run]];
            let skiDayActual = dayData[TRAINING_TYPE[TRAINING_TYPE.ski]];

            expect(!!cycDayActual || !!runDayActual || !!skiDayActual).toEqual(true);

            // Check totals
            if (cycDayActual !== undefined) {
              expect(cycDayActual).isCorrectStatisticPoint();

              addStatPoint(cycWeekExpected, cycDayActual);
              addStatPoint(cycMonthExpected, cycDayActual);
              addStatPoint(cycYearExpected, cycDayActual);
            }

            if (runDayActual !== undefined) {
              expect(runDayActual).isCorrectStatisticPoint();

              addStatPoint(runWeekExpected, runDayActual);
              addStatPoint(runMonthExpected, runDayActual);
              addStatPoint(runYearExpected, runDayActual);
            }

            if (skiDayActual !== undefined) {
              expect(skiDayActual).isCorrectStatisticPoint();

              addStatPoint(skiWeekExpected, skiDayActual);
              addStatPoint(skiMonthExpected, skiDayActual);
              addStatPoint(skiYearExpected, skiDayActual);
            }
          });

          if (cycWeekActual) expect(cycWeekActual).toEqual(cycWeekExpected);
          if (runWeekActual) expect(runWeekActual).toEqual(runWeekExpected);
          if (skiWeekActual) expect(skiWeekActual).toEqual(skiWeekExpected);
        });

        if (cycMonthActual) expect(cycMonthActual).toEqual(cycMonthExpected);
        if (runMonthActual) expect(runMonthActual).toEqual(runMonthExpected);
        if (skiMonthActual) expect(skiMonthActual).toEqual(skiMonthExpected);
      });

      if (cycYearActual) expect(cycYearActual).toEqual(cycYearExpected);
      if (runYearActual) expect(runYearActual).toEqual(runYearExpected);
      if (skiYearActual) expect(skiYearActual).toEqual(skiYearExpected);
    });
  });
});
