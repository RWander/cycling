var gulp = require('gulp-help')(require('gulp'));
var browserSync = require('browser-sync').create();
var path = require('./.path.json');

gulp.task('serve', 'Runs the development server', ['build', 'watch'], function () {
  // http://www.browsersync.io/docs/options/
  var options = {
    server: {
        baseDir: path.dist.root
    },
    port: 3000,
    tunnel: false
  };
  browserSync.init(options);
});
