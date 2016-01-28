'use strict';

var gulp = require('gulp-help')(require('gulp'));
var path = require('./.path.json');
var exec = require('child_process').exec;

gulp.task(
  'statistic',
  'Calculate statistic for the current athlete',
  (cb) => {
    exec(`node ${path.statistic}`, (err, stdout, stderr) => {

      /* eslint-disable no-console */
      console.log(stdout);
      console.log(stderr);
      /* eslint-disable no-console */

      cb(err);
    });
  }
);
