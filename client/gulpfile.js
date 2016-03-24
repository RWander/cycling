/*eslint-env node */

var gulp = require('gulp');
var requireDir = require('require-dir');

requireDir('./gulp');

gulp.task('default', ['help']);
