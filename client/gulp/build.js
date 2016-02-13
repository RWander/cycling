/* eslint-env node */
/* eslint-disable no-console */

'use strict';

var gulp = require('gulp-help')(require('gulp'));
var exec = require('child_process').exec;

gulp.task(
  'build:dev',
  'Lounch webpack to build for the development env.',
  ['clean'],
  (cb) => {
    exec('NODE_ENV=development webpack --display-modules -v', (err, stdout, stderr) => {

      console.log(stdout);
      console.log(stderr);

      cb(err);
    });
  }
);

gulp.task(
  'build:prod',
  'Lounch webpack to build for the development env.',
  ['clean'],
  (cb) => {
    exec('NODE_ENV=production webpack --display-modules -v', (err, stdout, stderr) => {

      console.log(stdout);
      console.log(stderr);

      cb(err);
    });
  }
);
