'use strict';

/* eslint-disable no-undef */

describe('Calculate statistic', function() {
  var calculate = require('../../src/libs/statistic');
  var generator = require('./helpers/generator');

  it('Check statistic', function() {
    let trainings = generator.trainings(10);
    let stat = calculate(trainings);

    // TODO: temporary failed
    // ..

    expect(stat).toEqual({});
  });
});
