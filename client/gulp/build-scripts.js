var gulp = require('gulp-help')(require('gulp'));

gulp.task(
  'build:scripts',
  'Concatenate and minify all js files.',
  ['build:js-vendor']
);
