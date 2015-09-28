var gulp = require('gulp-help')(require('gulp'));

gulp.task(
  'build:styles',
  'Build the application and vendor styles.',
  ['build:css-vendor', 'build:scss']
);
