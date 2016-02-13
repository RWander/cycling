'use strict';

var gulp = require('gulp-help')(require('gulp'));
var gutil = require('gulp-util');
var path = require('./.path.json');
var exec = require('child_process').exec;

gulp.task(
  'test',
  'Runs the Jasmine test specs',
  (cb) => {
    exec(`cd ${path.testDir} && NODE_ENV=test node jasmine-runner.js`, (err, stdout, stderr) => {
      gutil.log(stdout);
      gutil.log(stderr);

      cb(err);
    });
  }
);
