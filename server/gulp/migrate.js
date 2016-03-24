'use strict';

var gulp = require('gulp-help')(require('gulp'));
var gutil = require('gulp-util');
var path = require('./.path.json');
var exec = require('child_process').exec;

gulp.task(
  'migrate',
  'Migrate data from Strava API to the local db',
  (cb) => {
    exec(`node ${path.migration}`, (err, stdout, stderr) => {

      gutil.log(stdout);
      gutil.log(stderr);

      cb(err);
    });
  }
);
