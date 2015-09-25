var gulp = require('gulp-help')(require('gulp'));
var tsconfig = require('gulp-tsconfig-files');
var tsConfig = require('../tsconfig.json');

gulp.task(
  'build:tsconfig',
  'Update files property of tsconfig.json file.',
  function() {
    gulp.src(tsConfig.filesGlob)
      .pipe(tsconfig());
  }
);
