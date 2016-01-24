'use strict';

var gulp = require('gulp-help')(require('gulp'));
var path = require('./.path.json');
var exec = require('child_process').exec;

gulp.task(
  'migrate',
  'Migrate data from Strava API to the local db',
  (cb) => {
    exec(`node ${path.migration}`, (err, stdout, stderr) => {

      /* eslint-disable no-console */
      console.log(stdout);
      console.log(stderr);
      /* eslint-disable no-console */

      cb(err);
    });
  }
);
