/* eslint-env node */

'use strict';

var gulp = require('gulp-help')(require('gulp'));
var spawn = require('child_process').spawn;

gulp.task(
  'serve:dev',
  'Run simple static-server.',
  () => spawn('static-server', ['public'], { stdio: 'inherit' })
);
