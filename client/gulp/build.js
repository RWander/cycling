var gulp = require('gulp-help')(require('gulp'));
var runSequence = require('run-sequence');        // https://github.com/OverZealous/run-sequence
var debug = require('gulp-debug');
var path = require('./.path.json');

gulp.task('build', 'Builds the site.', function(cb) {
  runSequence('clean',
    ['build:scripts', 'build:styles', 'build:img', 'build:fonts'],
    cb);
});
