'use strict';

/* eslint-disable no-undef */

describe('Calculate statistic', function() {
  var faker = require('faker');
  var calculate = require('../../src/libs/statistic');

  it('1 is 1', function() {
    let trainings = generateTrainings();
    let stat = calculate(trainings);

    expect(stat).toEqual({});
  });

  function generateTrainings() {
    return [];
  }
});
