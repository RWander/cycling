var gulp = require('gulp-help')(require('gulp'));

gulp.task(
  'build:scripts',
  'Compiles all TypeScript "files", concatenate and minify all js files.',
  ['build:ts', 'build:js-vendor']
);
