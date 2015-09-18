var gulp = require('gulp-help')(require('gulp'));
var browserSync = require('browser-sync').create();
var path = require('./.path.json');

gulp.task('serve', 'Runs the development server', ['build', 'watch'], function () {
  browserSync.init({
      server: {
          baseDir: path.dist.root
      }
  });
});
