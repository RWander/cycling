'use strict';

/* eslint-disable no-undef */

describe('Calculate statistic', function() {
  // var obj;
  //
  // beforeEach(function() {
  //   obj = { };
  // });

  var calculate = require('../../src/libs/statistic');

  it('1 is 1', function() {
    let stat = calculate([]);
    expect(stat).toEqual({});
  });
});
