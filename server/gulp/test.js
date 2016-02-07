'use strict';

/* eslint-disable no-console */

var gulp = require('gulp-help')(require('gulp'));
var path = require('./.path.json');
var exec = require('child_process').exec;

gulp.task(
  'test',
  'Runs the Jasmine test specs',
  (cb) => {
    exec(`cd ${path.testDir} && NODE_ENV=test node jasmine-runner.js`, (err, stdout, stderr) => {

      console.log(stdout);
      console.log(stderr);

      cb(err);
    });
  }
);
