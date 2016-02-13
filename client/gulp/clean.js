/* eslint-env node */

var gulp = require('gulp-help')(require('gulp'));
var del = require('del');

gulp.task('clean', 'Cleans the dist folder', function() {
  return del([ 'public' ]);
});
