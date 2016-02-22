'use strict';

/* eslint-env jasmine */

describe('Calculate statistic', function() {
  var _ = require('lodash');
  var faker = require('faker');
  var statistic = require('../../../src/libs/statistic');
  var generator = require('../helpers/generator');

  const TrainingType = require('../../../src/models').TrainingType;

  it('Check statistic', function() {
    let trainingCount = faker.random.number({ min: 1, max: 100 });
    let trainings = generator.trainings(trainingCount);
    let stat = statistic.calculate(trainings);

    // not empty statistic
    expect(stat).not.toBeNull();
    expect(stat).not.toEqual({});

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

    let cycTotalActual = stat[TrainingType[TrainingType.cycling]];
    let cycTotalExpected = createStatPoint();
    let runTotalActual = stat[TrainingType[TrainingType.run]];
    let runTotalExpected = createStatPoint();
    let skiTotalActual = stat[TrainingType[TrainingType.ski]];
    let skiTotalExpected = createStatPoint();
    let swimTotalActual = stat[TrainingType[TrainingType.swim]];
    let swimTotalExpected = createStatPoint();

    // Statisitic Level # 1 - Year
    let years = _.omit(stat, TrainingType.vals());
    expect(years.length).not.toEqual(0);

    let yearsAll = _.keys(years);
    yearsAll.forEach((year) => {
      expect(year).isYearYYYY();

      // Statisitic Level # 2 - Month and Totals
      let yearData = stat[year];

      let cycYearActual = yearData[TrainingType[TrainingType.cycling]];
      let cycYearExpected = createStatPoint();
      let runYearActual = yearData[TrainingType[TrainingType.run]];
      let runYearExpected = createStatPoint();
      let skiYearActual = yearData[TrainingType[TrainingType.ski]];
      let skiYearExpected = createStatPoint();
      let swimYearActual = yearData[TrainingType[TrainingType.swim]];
      let swimYearExpected = createStatPoint();

      // Anything must be exist
      expect(!!runYearActual || !!cycYearActual || !!skiYearActual || !!swimYearActual ).toEqual(true);

      // Check totals
      if (runYearActual) expect(runYearActual).isCorrectStatisticPoint();
      if (cycYearActual) expect(cycYearActual).isCorrectStatisticPoint();
      if (skiYearActual) expect(skiYearActual).isCorrectStatisticPoint();
      if (swimYearActual) expect(swimYearActual).isCorrectStatisticPoint();

      // Check months
      let months = _.omit(yearData, TrainingType.vals());
      expect(months.length).not.toEqual(0);

      let monthNames = _.keys(months);
      monthNames.forEach((monthName) => {
        expect(monthName).isMonthMMM();

        let monthData = months[monthName];

        let cycMonthActual = monthData[TrainingType[TrainingType.cycling]];
        let cycMonthExpected = createStatPoint();
        let runMonthActual = monthData[TrainingType[TrainingType.run]];
        let runMonthExpected = createStatPoint();
        let skiMonthActual = monthData[TrainingType[TrainingType.ski]];
        let skiMonthExpected = createStatPoint();
        let swimMonthActual = monthData[TrainingType[TrainingType.swim]];
        let swimMonthExpected = createStatPoint();

        expect(!!cycMonthActual || !!runMonthActual || !!skiMonthActual|| !!swimMonthActual).toEqual(true);

        // Check totals
        if (cycMonthActual) expect(cycMonthActual).isCorrectStatisticPoint();
        if (runMonthActual) expect(runMonthActual).isCorrectStatisticPoint();
        if (skiMonthActual) expect(skiMonthActual).isCorrectStatisticPoint();
        if (swimMonthActual) expect(swimMonthActual).isCorrectStatisticPoint();

        // Check weeks
        let weeks = _.omit(monthData, TrainingType.vals());
        expect(weeks.length).not.toEqual(0);

        let weekNames = _.keys(weeks);
        weekNames.forEach((weekName) => {
          expect(weekName).isWeekNumber();

          let weekData = weeks[weekName];

          let cycWeekActual = weekData[TrainingType[TrainingType.cycling]];
          let cycWeekExpected = createStatPoint();
          let runWeekActual = weekData[TrainingType[TrainingType.run]];
          let runWeekExpected = createStatPoint();
          let skiWeekActual = weekData[TrainingType[TrainingType.ski]];
          let skiWeekExpected = createStatPoint();
          let swimWeekActual = weekData[TrainingType[TrainingType.swim]];
          let swimWeekExpected = createStatPoint();

          expect(!!cycWeekActual || !!runWeekActual || !!skiWeekActual|| !!swimWeekActual).toEqual(true);

          // Check totals
          if (cycWeekActual) expect(cycWeekActual).isCorrectStatisticPoint();
          if (runWeekActual) expect(runWeekActual).isCorrectStatisticPoint();
          if (skiWeekActual) expect(skiWeekActual).isCorrectStatisticPoint();
          if (swimWeekExpected) expect(swimWeekExpected).isCorrectStatisticPoint();

          // Check days
          let days = _.omit(weekData, TrainingType.vals());
          expect(days.length).not.toEqual(0);

          let daysNums = _.keys(days);
          daysNums.forEach((day) => {
            expect(day).isDayNumber();

            let dayData = weekData[day];

            let cycDayActual = dayData[TrainingType[TrainingType.cycling]];
            let runDayActual = dayData[TrainingType[TrainingType.run]];
            let skiDayActual = dayData[TrainingType[TrainingType.ski]];
            let swimDayActual = dayData[TrainingType[TrainingType.swim]];

            expect(!!cycDayActual || !!runDayActual || !!skiDayActual|| !!swimDayActual).toEqual(true);

            // Check totals
            if (cycDayActual !== undefined) {
              expect(cycDayActual).isCorrectStatisticPoint();

              addStatPoint(cycWeekExpected, cycDayActual);
              addStatPoint(cycMonthExpected, cycDayActual);
              addStatPoint(cycYearExpected, cycDayActual);
              addStatPoint(cycTotalExpected, cycDayActual);
            }

            if (runDayActual !== undefined) {
              expect(runDayActual).isCorrectStatisticPoint();

              addStatPoint(runWeekExpected, runDayActual);
              addStatPoint(runMonthExpected, runDayActual);
              addStatPoint(runYearExpected, runDayActual);
              addStatPoint(runTotalExpected, runDayActual);
            }

            if (skiDayActual !== undefined) {
              expect(skiDayActual).isCorrectStatisticPoint();

              addStatPoint(skiWeekExpected, skiDayActual);
              addStatPoint(skiMonthExpected, skiDayActual);
              addStatPoint(skiYearExpected, skiDayActual);
              addStatPoint(skiTotalExpected, skiDayActual);
            }

            if (swimDayActual !== undefined) {
              expect(swimDayActual).isCorrectStatisticPoint();

              addStatPoint(swimWeekExpected, swimDayActual);
              addStatPoint(swimMonthExpected, swimDayActual);
              addStatPoint(swimYearExpected, swimDayActual);
              addStatPoint(swimTotalExpected, swimDayActual);
            }
          });

          // week
          if (cycWeekActual) expect(cycWeekActual).toEqual(cycWeekExpected);
          if (runWeekActual) expect(runWeekActual).toEqual(runWeekExpected);
          if (skiWeekActual) expect(skiWeekActual).toEqual(skiWeekExpected);
          if (swimWeekActual) expect(swimWeekActual).toEqual(swimWeekExpected);
        });

        // month
        if (cycMonthActual) expect(cycMonthActual).toEqual(cycMonthExpected);
        if (runMonthActual) expect(runMonthActual).toEqual(runMonthExpected);
        if (skiMonthActual) expect(skiMonthActual).toEqual(skiMonthExpected);
        if (swimMonthActual) expect(swimMonthActual).toEqual(swimMonthExpected);
      });

      // year
      if (cycYearActual) expect(cycYearActual).toEqual(cycYearExpected);
      if (runYearActual) expect(runYearActual).toEqual(runYearExpected);
      if (skiYearActual) expect(skiYearActual).toEqual(skiYearExpected);
      if (swimYearActual) expect(swimYearActual).toEqual(swimYearExpected);
    });

    // total
    if (cycTotalActual) expect(cycTotalActual).toEqual(cycTotalExpected);
    if (runTotalActual) expect(runTotalActual).toEqual(runTotalExpected);
    if (skiTotalActual) expect(skiTotalActual).toEqual(skiTotalExpected);
    if (swimTotalActual) expect(swimTotalActual).toEqual(swimTotalExpected);
  });

  it('Check short statistic', function(done) {
    let trainingCount = faker.random.number({ min: 100, max: 150 });
    let trainings = generator.trainings(trainingCount);
    let stat = statistic.calculate(trainings);
    let shotStat = statistic.convertToShort(stat);

    // not empty statistic
    expect(shotStat).not.toBeNull();
    expect(shotStat).not.toEqual({});

    expect(_.keys(shotStat).length).toEqual(5, 'Shot statistic point should have today, week, month, year and total values');
    expect(shotStat.today).isCorrectShortStatisticPoint();
    expect(shotStat.week).isCorrectShortStatisticPoint();
    expect(shotStat.month).isCorrectShortStatisticPoint();
    expect(shotStat.year).isCorrectShortStatisticPoint();
    expect(shotStat.total).isCorrectShortStatisticPoint();

    done();
  });
});
