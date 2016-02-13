'use strict';

var gulp = require('gulp-help')(require('gulp'));
var gutil = require('gulp-util');
var path = require('./.path.json');
var exec = require('child_process').exec;

gulp.task(
  'statistic',
  'Calculate statistic for the current athlete',
  (cb) => {
    exec(`node ${path.statistic}`, (err, stdout, stderr) => {
      gutil.log(stdout);
      gutil.log(stderr);

      cb(err);
    });
  }
);
